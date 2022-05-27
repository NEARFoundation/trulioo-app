import { Transaction } from "../../models/Transaction.js";
import { Applicant } from "../../models/Applicant.js";

export const sendCheckResult = async (req, res) => {
  try {
    // TODO: Check the source of the request

    const transactionId = req.body["TransactionId"];
    const transactionRecordId = req.body["TransactionRecordId"];
    const status = req.body["Status"];

    if (transactionId && transactionRecordId && status === "Completed") {
      const transaction = await Transaction.findOne({ transactionId: transactionId });
      if (transaction) {
        console.log('The transaction has already been processed.');
        return res.send({});
      }

      await Transaction.create({
        transactionId: transactionId,
        rawBody: req.rawBody,
        transactionRecordId: transactionRecordId,
        status: status,
        transactionTimestamp: new Date(),
        processed: false
      });

      eventHandling(req, transactionId).then();
    } else {
      console.log('This event is being ignored.');
    }

    res.send({});

  } catch (e) {
    console.log('Webhook error:');
    console.log(e);
    res
      .status(500)
      .send({ error: 'Internal server error. Please try again later.' });
  }
}

const eventHandling = async (req, transactionId) => {
  try {
    console.log(`Handling event: ${transactionId}`);
    const truliooInstance = req.app.get('trulioo');
    const transaction = await Transaction.findOne({ transactionId: transactionId });

    if (transaction) {
      const transactionRecordId = transaction["transactionRecordId"];

      let applicant = await Applicant.findOne({tx1_id: transactionId});

      if (applicant) {
        if (applicant.status === "identity_verification_in_progress") {
          const response1 = await truliooInstance.get(`/verifications/v1/transactionrecord/${transactionRecordId}`);

          if (response1.data && response1.data["Record"]) {
            const status = response1.data["Record"]["RecordStatus"];
            applicant.tx1_record_id = transactionRecordId;
            applicant.result1 = response1.data;
            applicant.verify1_end_timestamp = new Date();
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
        applicant = await Applicant.findOne({tx2_id: transactionId});
        if (applicant) {

          if (applicant.status === "document_verification_in_progress") {
            const response2 = await truliooInstance.get(`/verifications/v1/transactionrecord/${transactionRecordId}`);

            if (response2.data && response2.data["Record"]) {
              const status = response2.data["Record"]["RecordStatus"];
              applicant.tx2_record_id = transactionRecordId;
              applicant.result2 = response2.data;
              applicant.verify2_end_timestamp = new Date();
              applicant.status = status === "match" ?
                "document_verification_completed" :
                "document_verification_failed";
              await applicant.save();

              transaction.processed = true;
              await transaction.save();

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
  } catch (e) {
    console.log('Unknown error:');
    console.log(e);
  }
}
