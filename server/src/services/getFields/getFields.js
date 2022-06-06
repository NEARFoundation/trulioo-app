import { cacheExpirationPeriod, Fields } from "../../models/Fields.js";
import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { hoursDifference } from "../../helpers/hoursDifference.js";

export const getFields = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const { country } = req.query;
    let fieldsRecord = await Fields.findOne({country: country});
    if (fieldsRecord && hoursDifference(new Date(), fieldsRecord.timestamp) < cacheExpirationPeriod) {
      res.send(fieldsRecord.fields);
    } else {
      const fields = await getFieldsFromTrulioo(country, req.app.get('trulioo'));
      if (!fieldsRecord) {
        fieldsRecord = new Fields({country: country});
      }
      fieldsRecord.fields = fields;
      fieldsRecord.timestamp = new Date();
      fieldsRecord.save();
      res.send(fields);
    }

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'The list of fields cannot be obtained. Please try again.' });
  }
}

function checkFieldsData(data) {
  // The required field for missing fields must be removed
  if (data && data.properties) {
    for (const [groupId, group] of Object.entries(data.properties)) {
      if (group && group.required) {
        let newRequired = []
        group.required.map(item => {
          if (group.properties[item]) {
            newRequired.push(item);
          }
        });
        data.properties[groupId].required = newRequired;
      }
    }
  }
  return data;
}

async function getFieldsFromTrulioo(country, truliooInstance) {
  const response = await truliooInstance.get(`/configuration/v1/recommendedfields/Identity%20Verification/${country}`);
  return checkFieldsData(response.data);
}
