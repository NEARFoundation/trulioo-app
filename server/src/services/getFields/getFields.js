import { checkCode, invalidCode } from '../../helpers/codeUtils';
import { hoursDifference } from '../../helpers/hoursDifference';
import { cacheExpirationPeriod, Fields } from '../../models/Fields';

export const getFields = async (request, response) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(response);
    }

    const { country } = request.query;
    let fieldsRecord = await Fields.findOne({ country });
    if (fieldsRecord && hoursDifference(new Date(), fieldsRecord.timestamp) < cacheExpirationPeriod) {
      response.send(fieldsRecord.fields);
    } else {
      const fields = await getFieldsFromTrulioo(country, request.app.get('trulioo'));
      if (!fieldsRecord) {
        fieldsRecord = new Fields({ country });
      }

      fieldsRecord.fields = fields;
      fieldsRecord.timestamp = new Date();
      fieldsRecord.save();
      response.send(fields);
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'The list of fields cannot be obtained. Please try again.' });
  }
};

function checkFieldsData(data) {
  // The required field for missing fields must be removed
  if (data && data.properties) {
    for (const [groupId, group] of Object.entries(data.properties)) {
      if (group && group.required) {
        const newRequired = [];
        group.required.map((item) => {
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
