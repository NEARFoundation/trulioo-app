import { Applicant } from "../../models/Applicant.js";
import axios from "axios";
import { createTransaction, eventHandling } from "../checkResult/checkResult.js";
import cron from "node-cron";
import {
  delayBeforeStartCheck,
  docVStatusUpdateSchedule,
  maxSearchDept,
  transactionStatusUpdateSchedule
} from "../../config/cron.config.js";
import { EXPERIENCE_TRANSACTION_URL, truliooApiKey } from "../../config/trulioo.config.js";
import { Transaction } from "../../models/Transaction.js";

export const createSchedules = app => {
  cron.schedule(docVStatusUpdateSchedule, async () =>  {
    await updateDocVStatuses(app);
  }, { scheduled: true })
  cron.schedule(transactionStatusUpdateSchedule, async () =>  {
    await updateTxStatuses(app);
  }, { scheduled: true })

  async function updateDocVStatuses(app) {
    try {
      const truliooInstance = app.get('trulioo');
      const dateBegin = new Date(Date.now() - maxSearchDept * 60 * 60 * 1000);
      const dateEnd = new Date(Date.now() - delayBeforeStartCheck * 1000);
      const applicants = await Applicant.find(
        {
          verifyBeginTimestamp2: {$lt: dateEnd, $gte: dateBegin},
          status: {$eq: 'document_verification_in_progress'},
          txId2: {$eq: null}
        }
      );

      applicants.map(async applicant => {
        try {
          const txId = applicant.feTxId;
          console.log(`Transaction ID ${txId}`);

          const response = await axios.get(
            `${EXPERIENCE_TRANSACTION_URL}/${txId}`,
            {
              headers: {
                'x-trulioo-api-key': truliooApiKey,
              }
            }
          );

          const status = response.data ? response.data.status : "unknown";
          console.log(`Status: ${status}`);

          if (status === 'complete') {
            const steps = response.data.steps;

            if (steps) {
              const step = steps.find(element => {
                return element["transactionType"] === "EmbedID" && element["stepName"] === "DocVStep";
              });

              if (step) {
                const transactionId = step["transactionId"];
                const transactionRecordId = step["transactionRecordId"];

                if (transactionId && transactionRecordId) {
                  applicant.txId2 = transactionId;
                  await applicant.save();

                  const txResult = await createTransaction(transactionId, transactionRecordId, truliooInstance);
                  if (txResult) {
                    console.log('The transaction was successfully created')
                  } else {
                    console.log('The transaction has already been processed.');
                  }
                }
              }
            }
          }

        } catch (e) {
          console.log(e);
        }
      });

    } catch (e) {
      console.log(e);
    }
  }

  async function updateTxStatuses(app) {
    try {
      const truliooInstance = app.get('trulioo');
      const dateBegin = new Date(Date.now() - maxSearchDept * 60 * 60 * 1000);
      const dateEnd = new Date(Date.now() - delayBeforeStartCheck * 1000);
      const transactions = await Transaction.find(
        {
          transactionTimestamp: {$lt: dateEnd, $gte: dateBegin},
          processed: {$eq: false}
        }
      );

      transactions.map(async tx => {
        await eventHandling(truliooInstance, tx.transactionId);
      });

    } catch (e) {
      console.log(e);
    }
  }
}
