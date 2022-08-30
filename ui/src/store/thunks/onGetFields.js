import { thunk } from 'easy-peasy';

import { api } from '../../config/api';
import { getFields } from '../helpers/getFields';
import { presetTruliooFields } from '../helpers/presetTruliooFields';

export const onGetFields = thunk(
  async (
    actions,
    { countryCode, additionalFields, whiteListedTruliooFields, currentTruliooFields, setLoading },
  ) => {
    try {
      setLoading(true);
      const setFieldsSchema = actions.setFieldsSchema;
      const response = await api.requestFields(countryCode);
      const parsedFields = getFields.parseFields(response);
      const copiedParsedFields = getFields.deepCopy(parsedFields);
      const fields = getFields.parseFieldDates(copiedParsedFields);
      const subdivisions = await api.requestSubdivisions(countryCode);
      let consents = await api.requestConsents(countryCode);
      consents = getFields.generateConsentSchema(consents);
      getFields.validateAdditionalFields(additionalFields);
      if (fields && fields.properties) {
        getFields.updateStateProvince(fields.properties, subdivisions);
        if (fields.properties.NationalIds) {
          getFields.transformNationalIdsForCountry(fields.properties.NationalIds, countryCode);
        }
      }

      let finalFields = fields;
      if (whiteListedTruliooFields) {
        finalFields = getFields.getWhiteListedFieldsOnly(fields, whiteListedTruliooFields, {});
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
    } catch (error) {
      console.log(`Error:${error}`);
    }
  },
);
