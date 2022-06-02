import { checkCode, invalidCode } from "../../helpers/codeUtils.js";

export const getFields = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const truliooInstance = req.app.get('trulioo');
    const { country } = req.query;
    const response = await truliooInstance.get(`/configuration/v1/recommendedfields/Identity%20Verification/${country}`);
    res.send(checkFieldsData(response.data));

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
