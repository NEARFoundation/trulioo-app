import { DAY_OF_BIRTH, MONTH_OF_BIRTH, YEAR_OF_BIRTH, DOB, DOB_TITLE } from './constantDateFields';
import constantNationalIds from './constantNationalIds';
import * as R from 'ramda';

import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

const countryObj = countries.getNames('en', { select: 'official' });

export const localeCountriesArr = Object.entries(countryObj).map(([key, value]) => {
  return {
    name: value,
    code: key,
  };
});

const reservedFormDataKeys = ['countries', 'TruliooFields', 'Consents'];
const dateFields = ['DayOfBirth', 'MonthOfBirth', 'YearOfBirth'];
const dateFieldsMap = new Map();
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const hasDOBInMap = () => {
  const dayOfBirthInMap = dateFieldsMap.get(DAY_OF_BIRTH);
  const monthOfBirthInMap = dateFieldsMap.get(MONTH_OF_BIRTH);
  const yearOfBirthInMap = dateFieldsMap.get(YEAR_OF_BIRTH);
  return dayOfBirthInMap && monthOfBirthInMap && yearOfBirthInMap;
};

const parseFields = (obj) => {
  for (const [key] of Object.entries(obj)) {
    if (key == 0) {
      return;
    }
    if (key === 'label') {
      obj.title = obj[key];
    }
    parseFields(obj[key]);
  }
  return obj;
};

const parseFieldDates = (obj) => {
  updateDateRequiredArray(obj);
  for (const [key] of Object.entries(obj)) {
    if (key == 0) {
      return;
    }
    if (key === 'label') {
      obj.title = obj[key];
    }
    if (!dateFields.includes(key)) {
      parseFieldDates(obj[key]);
    } else {
      dateFieldsMap.set(key, true);
    }
    if (
      (key === DAY_OF_BIRTH || key === MONTH_OF_BIRTH || key === YEAR_OF_BIRTH) &&
      hasDOBInMap()
    ) {
      delete obj[DAY_OF_BIRTH];
      delete obj[MONTH_OF_BIRTH];
      delete obj[YEAR_OF_BIRTH];
      obj.DOB = {
        title: DOB_TITLE,
        type: 'string',
        format: 'date',
      };
    }
  }
  return obj;
};

const containsDOBRequired = (required) =>
  required &&
  required.includes(DAY_OF_BIRTH) &&
  required.includes(MONTH_OF_BIRTH) &&
  required.includes(YEAR_OF_BIRTH);

const updateDateRequiredArray = (obj) => {
  const { required } = obj;

  if (!obj.properties || !required) {
    return;
  }

  const containsDOB = containsDOBRequired(obj.required);
  if (containsDOB) {
    obj.required = required.filter(
      (requiredField) =>
        requiredField !== DAY_OF_BIRTH &&
        requiredField !== MONTH_OF_BIRTH &&
        requiredField !== YEAR_OF_BIRTH,
    );
    obj.required.push(DOB);
  }
};

const generateConsentSchema = (consents) => {
  if (!consents || !consents.length) {
    return;
  }
  const schema = {
    title: 'Consents',
    type: 'object',
    required: [],
    properties: {},
  };
  consents.forEach((x) => {
    schema.required.push(x);
    schema.properties[x] = {
      title: x,
      type: 'boolean',
      default: false,
    };
  });
  return schema;
};

const updateStateProvince = (obj, subdivisions) => {
  Object.keys(obj).forEach((k) => {
    if (k === 'StateProvinceCode' && subdivisions.length > 0) {
      obj[k] = {
        ...obj[k],
        enum: subdivisions.map((x) => x.Code),
        enumNames: subdivisions.map((x) => x.Name),
      };
    } else if (obj[k] !== null && typeof obj[k] === 'object') {
      updateStateProvince(obj[k], subdivisions);
    }
  });
};

const transformNationalIdsForCountry = (nationalIds, countryCode) => {
  if (constantNationalIds[countryCode]) {
    if (nationalIds.properties) {
      // change the description for the field to use constant national id names
      if (nationalIds.properties.Number && nationalIds.properties.Number.description) {
        nationalIds.properties.Number.description = constantNationalIds[countryCode]
          .map((nationalId) => `(${nationalId.name})`)
          .join(', ');
      }
      // change the Type select to use national id names instead of GG national id types
      if (nationalIds.properties.Type && nationalIds.properties.Type.enum) {
        nationalIds.properties.Type.enum = constantNationalIds[countryCode].map(
          (nationalId) => nationalId.name,
        );
      }
      // remove Type select if only one option in select
      if (constantNationalIds[countryCode].length < 2 && nationalIds.properties.Type) {
        delete nationalIds.properties.Type;
        if (nationalIds.required && nationalIds.required.length === 2) {
          nationalIds.required = [nationalIds.required[0]];
        }
      }
    }
  }
};

const parseSubmitTruliooDateFields = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (key === DOB) {
      const splitDate = obj[key].split('-');
      const [year, month, day] = splitDate;
      obj[DAY_OF_BIRTH] = day;
      obj[MONTH_OF_BIRTH] = month;
      obj[YEAR_OF_BIRTH] = year;
      delete obj[DOB];
    }
    if (typeof obj[key] === 'object') {
      parseSubmitTruliooDateFields(obj[key]);
    }
  });
  return obj;
};

const parseTruliooFields = (formData) => {
  const truliooFields = {};
  Object.keys(formData).forEach((key) => {
    if (reservedFormDataKeys.includes(key)) {
      truliooFields[key] = formData[key];
    }
  });
  if (hasDOBInMap()) {
    const parsedFieldsWithDates = parseSubmitTruliooDateFields(truliooFields);
    return parsedFieldsWithDates;
  }
  return truliooFields;
};

const getNationalIdsForGG = (nationalIds, countryCode) => {
  if (constantNationalIds[countryCode]) {
    if (nationalIds.Type) {
      return [
        {
          ...nationalIds,
          Type: constantNationalIds[countryCode].find((natIds) => natIds.name === nationalIds.Type)
            .type,
        },
      ];
    }
    if (nationalIds.Number) {
      return [{ ...nationalIds, Type: constantNationalIds[countryCode][0].type }];
    }
    return;
  }
  return [nationalIds];
};

const getWhiteListedFieldsOnly = (fields, whiteListedTruliooFields, whiteListedComputedFields) => {
  Object.keys(whiteListedTruliooFields).forEach((key) => {
    const keyExists = Object.prototype.hasOwnProperty.call(fields, key);
    // key is not contained in fields
    if (!keyExists) {
      return;
    }
    const hasDefinedChildren = Object.keys(whiteListedTruliooFields[key]).length > 0;
    if (hasDefinedChildren) {
      whiteListedComputedFields[key] = {};
      if (fields.title) {
        whiteListedComputedFields.title = fields.title;
      }
      if (fields.type) {
        whiteListedComputedFields.type = fields.type;
      }
      if (fields.required) {
        const childProperties = Object.keys(whiteListedTruliooFields.properties);
        const whiteListedRequiredFields = fields.required.filter((requiredField) =>
          childProperties.includes(requiredField),
        );
        whiteListedComputedFields.required = whiteListedRequiredFields;
      }
      getWhiteListedFieldsOnly(
        fields[key],
        whiteListedTruliooFields[key],
        whiteListedComputedFields[key],
      );
    } else {
      whiteListedComputedFields[key] = fields[key];
    }
  });
  return whiteListedComputedFields;
};

const parseFormData = (form) => {
  if (form === undefined || form.TruliooFields === undefined) {
    return form;
  }
  if (form.TruliooFields.Document) {
    const docFront = form.TruliooFields.Document.DocumentFrontImage;
    form.TruliooFields.Document.DocumentFrontImage = docFront.substr(docFront.indexOf(',') + 1);
    const docBack = form.TruliooFields.Document.DocumentBackImage;
    if (docBack) {
      form.TruliooFields.Document.DocumentBackImage = docBack.substr(docBack.indexOf(',') + 1);
    }
    const livePhoto = form.TruliooFields.Document.LivePhoto;
    if (livePhoto) {
      form.TruliooFields.Document.LivePhoto = livePhoto.substr(livePhoto.indexOf(',') + 1);
    }
  }
  if (form.TruliooFields.NationalIds) {
    const nationalIds = form.TruliooFields.NationalIds;
    form.TruliooFields.NationalIds = getNationalIdsForGG(nationalIds, form.countries);
  }
  return form;
};

const getCountryCode = (form) => {
  for (const [key, value] of Object.entries(form)) {
    if (key === 'countries') {
      return value;
    }
  }
};

const validateAdditionalFields = (additionalFields) => {
  if (!additionalFields || !additionalFields.properties) {
    return;
  }
  const containsReservedKeys = R.intersection(
    Object.keys(additionalFields.properties),
    reservedFormDataKeys,
  );
  if (containsReservedKeys.length > 0) {
    throw Error(
      `${containsReservedKeys.toString()} is a reserved field key. Please use different naming for your additional fields.`,
    );
  }
};

const parseConsents = (consents) => {
  const result = [];
  if (consents === undefined) {
    return result;
  }
  Object.keys(consents).forEach((x) => {
    /* istanbul ignore else */
    if (consents[x]) {
      result.push(x);
    }
  });
  return result;
};

const getSubmitBody = (form) => {
  const countryCode = getCountryCode(form);
  form = parseFormData(form);

  return {
    session_id: null,
    country: countryCode,
    fields: form.TruliooFields,
    consents: parseConsents(form.Consents),
  };
};

export const helpers = {
  deepCopy,
  parseFields,
  parseFieldDates,
  updateDateRequiredArray,
  generateConsentSchema,
  updateStateProvince,
  transformNationalIdsForCountry,
  parseTruliooFields,
  getSubmitBody,
  getWhiteListedFieldsOnly,
  validateAdditionalFields,
};
