import { thunk } from 'easy-peasy';
import { api } from '../../config/api';
import { helpers } from '../helpers/helpers';
import { presetTruliooFields } from '../helpers/getFields';

export const onGetFields = thunk(
  async (
    actions,
    { countryCode, additionalFields, whiteListedTruliooFields, currentTruliooFields, setLoading },
  ) => {
    try {
      setLoading(true);
      const setFieldsSchema = actions.setFieldsSchema;
      const response = await api.requestFields(countryCode);
      const parsedFields = helpers.parseFields(response);
      const copiedParsedFields = helpers.deepCopy(parsedFields);
      const fields = helpers.parseFieldDates(copiedParsedFields);
      const subdivisions = await api.requestSubdivisions(countryCode);
      let consents = await api.requestConsents(countryCode);
      consents = helpers.generateConsentSchema(consents);
      helpers.validateAdditionalFields(additionalFields);
      if (fields && fields.properties) {
        helpers.updateStateProvince(fields.properties, subdivisions);
        if (fields.properties.NationalIds) {
          helpers.transformNationalIdsForCountry(fields.properties.NationalIds, countryCode);
        }
      }
      let finalFields = fields;
      if (whiteListedTruliooFields) {
        finalFields = helpers.getWhiteListedFieldsOnly(fields, whiteListedTruliooFields, {});
      }
      if (currentTruliooFields) {
        presetTruliooFields(finalFields.properties, currentTruliooFields);
      }
      setFieldsSchema({
        fields: finalFields,
        consents,
        additionalFields,
        formData: {
          countries: countryCode,
        },
      });
      setLoading(false);
    } catch (e) {
      console.log(`Error:${e}`);
    }
  },
);
