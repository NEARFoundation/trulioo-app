import { checkCode, disableCode, invalidCode } from "../../helpers/codeUtils.js";
import { Applicant } from "../../models/Applicant.js";
import { Transaction } from "../../models/Transaction.js";

export const checkResult = async (request, res) => {
  try {
    // TODO: Check the source of the request
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(res);
    }

    const truliooInstance = request.app.get('trulioo');
    const transactionId = request.body.TransactionId;
    const transactionRecordId = request.body.TransactionRecordId;

    if (transactionId && transactionRecordId && request.body.Status === "Completed") {
      const txResult = await createTransaction(transactionId, transactionRecordId, truliooInstance);
      if (!txResult) {
        console.log('The transaction has already been processed.');
        return res.send({});
      }
    } else {
      console.log('This event is being ignored.');
    }

    res.send({});

  } catch (error) {
    console.log('Webhook error:');
    console.log(error);
    res
      .status(500)
      .send({ error: 'Internal server error. Please try again later.' });
  }
}

export const createTransaction = async (transactionId, transactionRecordId, truliooInstance) => {
  const transaction = await Transaction.findOne({ transactionId });
  if (transaction) {
    return false;
  }

  await Transaction.create({
    transactionId,
    transactionRecordId,
    transactionTimestamp: new Date(),
    processed: false
  });

  eventHandling(truliooInstance, transactionId).then();
  return true;
}

export const eventHandling = async (truliooInstance, transactionId) => {
  try {
    console.log(`Handling event: ${transactionId}`);
    const transaction = await Transaction.findOne({ transactionId });

    if (transaction) {
      const transactionRecordId = transaction.transactionRecordId;

      let applicant = await Applicant.findOne({txId1: transactionId});

      if (applicant) {
        if (applicant.status === "identity_verification_in_progress") {
          const response1 = await truliooInstance.get(`/verifications/v1/transactionrecord/${transactionRecordId}`);

          if (response1.data && response1.data.Record) {
            const status = response1.data.Record.RecordStatus;
            applicant.txRecordId1 = transactionRecordId;
            applicant.result1 = response1.data;
            applicant.verifyEndTimestamp1 = new Date();
            applicant.status = status === "match" ?
              "identity_verification_completed" :
              "identity_verification_failed";
            await applicant.save();

            transaction.processed = true;
            await transaction.save();

            console.log(`The applicant was granted the status: '${applicant.status}'`);

          } else {
            console.log("Invalid query response format.");
          }
        } else {
          console.log("Applicant must have 'identity_verification_in_progress' status.");
        }
      } else {
        applicant = await Applicant.findOne({txId2: transactionId});
        if (applicant) {

          if (applicant.status === "document_verification_in_progress") {
            const response2 = await truliooInstance.get(`/verifications/v1/transactionrecord/${transactionRecordId}`);

            if (response2.data && response2.data.Record) {
              const status = response2.data.Record.RecordStatus;
              applicant.txRecordId2 = transactionRecordId;
              applicant.result2 = response2.data;
              applicant.verifyEndTimestamp2 = new Date();
              applicant.status = status === "match" ?
                "document_verification_completed" :
                "document_verification_failed";
              await applicant.save();

              transaction.processed = true;
              await transaction.save();

              if (applicant.status === "document_verification_completed") {
                await disableCode(applicant.code);
              }

              console.log(`The applicant was granted the status: '${applicant.status}'`);

            } else {
              console.log("Invalid query response format.");
            }
          } else {
            console.log("Applicant must have 'document_verification_in_progress' status.");
          }
        } else {
          console.log('The applicant for the transaction was not found.');
        }
      }
    } else {
      console.log('Transaction not found.')
    }
  } catch (error) {
    console.log('Unknown error:');
    console.log(error);
  }
}
