/* eslint-disable import/extensions */
import { ipListWhitelist } from '../../config/trulioo.config.js';
import { checkCode, disableCode, invalidCode } from '../../helpers/codeUtils.js';
import { Applicant } from '../../models/Applicant.js';
import { Transaction } from '../../models/Transaction.js';

/**
 * Searching for Trulioo transactions by TransactionRecordID.
 * See: https://gateway-admin.trulioo.com/documentation/docs#operation/GetTransactionRecord.
 * Updating the status of the applicant for whom identity or document verification has been initiated.
 *
 * @param {*} truliooInstance
 * @param {*} transactionId
 */
export const eventHandling = async (truliooInstance, transactionId) => {
  try {
    console.log(`Handling event: ${transactionId}`);
    const transaction = await Transaction.findOne({ transactionId });

    if (transaction) {
      const transactionRecordId = transaction.transactionRecordId;

      let applicant = await Applicant.findOne({ identityVerificationTransactionId: transactionId });

      if (applicant) {
        // TODO: See if we can refactor to reduce duplication with some code blocks below.
        if (applicant.status === 'identity_verification_in_progress') {
          const response1 = await truliooInstance.get(`/verifications/v1/transactionrecord/${transactionRecordId}`);

          if (response1.data && response1.data.Record) {
            const status = response1.data.Record.RecordStatus;
            applicant.identityVerificationTransactionRecordId = transactionRecordId;
            applicant.identityVerificationResult = response1.data;
            applicant.identityVerificationVerifyEndTimestamp = new Date();
            applicant.status = status === 'match' ? 'identity_verification_completed' : 'identity_verification_failed';
            await applicant.save();

            transaction.processed = true;
            await transaction.save();

            console.log(`The applicant was granted the status: '${applicant.status}'`);
          } else {
            console.log('Invalid query response format.');
          }
        } else {
          console.log("Applicant must have 'identity_verification_in_progress' status.");
        }
      } else {
        applicant = await Applicant.findOne({ documentVerificationTransactionId: transactionId });
        if (applicant) {
          if (applicant.status === 'document_verification_in_progress') {
            const response2 = await truliooInstance.get(`/verifications/v1/transactionrecord/${transactionRecordId}`);

            if (response2.data && response2.data.Record) {
              const status = response2.data.Record.RecordStatus;
              applicant.documentVerificationTransactionRecordId = transactionRecordId;
              applicant.documentVerificationResult = response2.data;
              applicant.documentVerificationVerifyEndTimestamp = new Date();
              applicant.status = status === 'match' ? 'document_verification_completed' : 'document_verification_failed';
              await applicant.save();

              transaction.processed = true;
              await transaction.save();

              if (applicant.status === 'document_verification_completed') {
                await disableCode(applicant.code);
              }

              console.log(`The applicant was granted the status: '${applicant.status}'`);
            } else {
              console.log('Invalid query response format.');
            }
          } else {
            console.log("Applicant must have 'document_verification_in_progress' status.");
          }
        } else {
          console.log('The applicant for the transaction was not found.');
        }
      }
    } else {
      console.log('Transaction not found.');
    }
  } catch (error) {
    console.log('Unknown error:');
    console.log(error);
  }
};

export const createTransaction = async (transactionId, transactionRecordId, truliooInstance) => {
  const transaction = await Transaction.findOne({ transactionId });
  if (transaction) {
    return false;
  }

  await Transaction.create({
    transactionId,
    transactionRecordId,
    transactionTimestamp: new Date(),
    processed: false,
  });

  eventHandling(truliooInstance, transactionId).then();
  return true;
};

export const checkResult = async (request, response) => {
  try {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(`IP address ${ip} is trying to access the /:code/api/send-check-result endpoint.`);
    if (!ipListWhitelist.includes(ip)) {
      console.log(`IP address ${ip} is not allowed to access this endpoint.`);
      return response.status(403).send('Forbidden');
    }

    const checkCodeResult = await checkCode(request);
    if (!checkCodeResult) {
      return invalidCode(response);
    }

    const truliooInstance = request.app.get('trulioo');
    const transactionId = request.body.TransactionId;
    const transactionRecordId = request.body.TransactionRecordId;

    if (transactionId && transactionRecordId && request.body.Status === 'Completed') {
      const txResult = await createTransaction(transactionId, transactionRecordId, truliooInstance);
      if (!txResult) {
        console.log('The transaction has already been processed.');
        return response.send({});
      }
    } else {
      console.log('This event is being ignored.');
    }

    response.send({});
  } catch (error) {
    console.log('Webhook error:');
    console.log(error);
    response.status(500).send({ error: 'Internal server error. Please try again later.' });
  }
};
