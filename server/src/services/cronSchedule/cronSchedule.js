/* eslint-disable import/extensions */
import axios from 'axios';
import cron from 'node-cron';

import { delayBeforeStartCheck, docVStatusUpdateSchedule as documentVStatusUpdateSchedule, maxSearchDept, transactionStatusUpdateSchedule } from '../../config/cron.config.js';
import { EXPERIENCE_TRANSACTION_URL, truliooApiKey } from '../../config/trulioo.config.js';
import { Applicant } from '../../models/Applicant.js';
import { Transaction } from '../../models/Transaction.js';
import { createTransaction, eventHandling } from '../checkResult/checkResult.js';

const fetchTransaction = async (txId) => {
  console.log(`Transaction ID ${txId}`);
  const response = await axios.get(`${EXPERIENCE_TRANSACTION_URL}/${txId}`, {
    headers: {
      'x-trulioo-api-key': truliooApiKey,
    },
  });

  const status = response.data ? response.data.status : 'unknown';
  console.log(`Status: ${status}`);

  return { status, steps: response?.data?.steps };
};

/**
 * TODO: Document how steps work and why this function is necessary.
 * See: https://gateway-admin.trulioo.com/documentation/embedid#5.-understanding-the-verification-response
 *
 * @param {Array} steps
 * @returns {object}
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
const getEmbedIDDocVStep = (steps) => {
  return steps.find((element) => {
    return element.transactionType === 'EmbedID' && element.stepName === 'DocVStep';
  });
};

/**
 * Create a document verification transaction and update the transaction ID for the applicant.
 *
 * @param {*} truliooInstance
 * @param {*} applicant
 * @param {*} step
 */

const createDocumentVerificationTransactionAndUpdateId = async (truliooInstance, applicant, step) => {
  const { transactionId, transactionRecordId } = step;

  if (transactionId && transactionRecordId) {
    await Applicant.findOneAndUpdate({ _id: applicant._id }, { documentVerificationTransactionId: transactionId });

    const txResult = await createTransaction(transactionId, transactionRecordId, truliooInstance);
    if (txResult) {
      console.log('The transaction was successfully created.');
    } else {
      console.log('The transaction has already been processed.');
    }
  }
};

/**
 * Processing of applicants for whom a document check has been initiated to find data on completed trulioo transactions.
 * TODO: Clarify what this means.
 *
 * @param {Express app?} app
 */
async function updateDocumentVStatuses(app) {
  try {
    const truliooInstance = app.get('trulioo');
    const dateBegin = new Date(Date.now() - maxSearchDept * 60 * 60 * 1_000);
    const dateEnd = new Date(Date.now() - delayBeforeStartCheck * 1_000);
    const applicants = await Applicant.find({
      documentVerificationVerifyBeginTimestamp: { $lt: dateEnd, $gte: dateBegin },
      status: { $eq: 'document_verification_in_progress' },
      documentVerificationTransactionId: { $eq: null },
    });

    applicants.map(async (applicant) => {
      try {
        const txId = applicant.experienceTransactionId;
        const { status, steps } = await fetchTransaction(txId);

        if (status === 'complete' && steps) {
          const step = getEmbedIDDocVStep(steps);

          if (step) {
            await createDocumentVerificationTransactionAndUpdateId(truliooInstance, applicant, step);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateTxStatuses(app) {
  try {
    const truliooInstance = app.get('trulioo');
    const dateBegin = new Date(Date.now() - maxSearchDept * 60 * 60 * 1_000);
    const dateEnd = new Date(Date.now() - delayBeforeStartCheck * 1_000);
    const transactions = await Transaction.find({
      transactionTimestamp: { $lt: dateEnd, $gte: dateBegin },
      processed: { $eq: false },
    });

    transactions.map(async (tx) => {
      await eventHandling(truliooInstance, tx.transactionId);
    });
  } catch (error) {
    console.log(error);
  }
}

export const createSchedules = (app) => {
  cron.schedule(
    documentVStatusUpdateSchedule,
    async () => {
      await updateDocumentVStatuses(app);
    },
    { scheduled: true },
  );
  cron.schedule(
    transactionStatusUpdateSchedule,
    async () => {
      await updateTxStatuses(app);
    },
    { scheduled: true },
  );
};
