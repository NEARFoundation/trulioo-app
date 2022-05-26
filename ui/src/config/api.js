import { utils } from '../utils/utils';

const requestFields = async (countryCode) => {
  //const URL = `/api/getrecommendedfields/${countryCode}`;
  //const response = await axios.get(URL);
  //const parsedFields = parseFields(response.data.response);
  const response = utils.defFields();
  const parsedFields = utils.parseFields(response);

  const copiedParsedFields = utils.deepCopy(parsedFields);
  return utils.parseFieldDates(copiedParsedFields);
};

export const api = {
  requestFields,
};
