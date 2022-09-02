import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import * as R from 'ramda';

import { DAY_OF_BIRTH, MONTH_OF_BIRTH, YEAR_OF_BIRTH, DOB, DOB_TITLE } from './constantDateFields';
import constantNationalIds from './constantNationalIds';

countries.registerLocale(enLocale);

const countryObject = countries.getNames('en', { select: 'official' });

export const localeCountriesArr = Object.entries(countryObject).map(([key, value]) => {
  return {
    name: value,
    code: key,
  };
});

const reservedFormDataKeys = ['countries', 'TruliooFields', 'Consents'];
const dateFields = ['DayOfBirth', 'MonthOfBirth', 'YearOfBirth'];
const dateFieldsMap = new Map();
const deepCopy = (object) => JSON.parse(JSON.stringify(object));

const hasDOBInMap = () => {
  const dayOfBirthInMap = dateFieldsMap.get(DAY_OF_BIRTH);
  const monthOfBirthInMap = dateFieldsMap.get(MONTH_OF_BIRTH);
  const yearOfBirthInMap = dateFieldsMap.get(YEAR_OF_BIRTH);
  return dayOfBirthInMap && monthOfBirthInMap && yearOfBirthInMap;
};

const parseFields = (object) => {
  for (const [key] of Object.entries(object)) {
    if (key == 0) {
      return;
    }

    if (key === 'label') {
      object.title = object[key];
    }

    parseFields(object[key]);
  }

  return object;
};

const parseFieldDates = (object) => {
  updateDateRequiredArray(object);
  for (const [key] of Object.entries(object)) {
    if (key == 0) {
      return;
    }

    if (key === 'label') {
      object.title = object[key];
    }

    if (!dateFields.includes(key)) {
      parseFieldDates(object[key]);
    } else {
      dateFieldsMap.set(key, true);
    }

    if ((key === DAY_OF_BIRTH || key === MONTH_OF_BIRTH || key === YEAR_OF_BIRTH) && hasDOBInMap()) {
      delete object[DAY_OF_BIRTH];
      delete object[MONTH_OF_BIRTH];
      delete object[YEAR_OF_BIRTH];
      object.DOB = {
        title: DOB_TITLE,
        type: 'string',
        format: 'date',
      };
    }
  }

  return object;
};

const containsDOBRequired = (required) => required && required.includes(DAY_OF_BIRTH) && required.includes(MONTH_OF_BIRTH) && required.includes(YEAR_OF_BIRTH);

const updateDateRequiredArray = (object) => {
  const { required } = object;

  if (!object.properties || !required) {
    return;
  }

  const containsDOB = containsDOBRequired(object.required);
  if (containsDOB) {
    object.required = required.filter((requiredField) => requiredField !== DAY_OF_BIRTH && requiredField !== MONTH_OF_BIRTH && requiredField !== YEAR_OF_BIRTH);
    object.required.push(DOB);
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
  for (const x of consents) {
    schema.required.push(x);
    schema.properties[x] = {
      title: x,
      type: 'boolean',
      default: false,
    };
  }

  return schema;
};

const updateStateProvince = (object, subdivisions) => {
  for (const k of Object.keys(object)) {
    if (k === 'StateProvinceCode' && subdivisions.length > 0) {
      object[k] = {
        ...object[k],
        enum: subdivisions.map((x) => x.Code),
        enumNames: subdivisions.map((x) => x.Name),
      };
    } else if (object[k] !== null && typeof object[k] === 'object') {
      updateStateProvince(object[k], subdivisions);
    }
  }
};

const transformNationalIdsForCountry = (nationalIds, countryCode) => {
  if (constantNationalIds[countryCode] && nationalIds.properties) {
    // change the description for the field to use constant national id names
    if (nationalIds.properties.Number && nationalIds.properties.Number.description) {
      nationalIds.properties.Number.description = constantNationalIds[countryCode].map((nationalId) => `(${nationalId.name})`).join(', ');
    }

    // change the Type select to use national id names instead of GG national id types
    if (nationalIds.properties.Type && nationalIds.properties.Type.enum) {
      nationalIds.properties.Type.enum = constantNationalIds[countryCode].map((nationalId) => nationalId.name);
    }

    // remove Type select if only one option in select
    if (constantNationalIds[countryCode].length < 2 && nationalIds.properties.Type) {
      delete nationalIds.properties.Type;
      if (nationalIds.required && nationalIds.required.length === 2) {
        nationalIds.required = [nationalIds.required[0]];
      }
    }
  }
};

const parseSubmitTruliooDateFields = (object) => {
  for (const key of Object.keys(object)) {
    if (key === DOB) {
      const splitDate = object[key].split('-');
      const [year, month, day] = splitDate;
      object[DAY_OF_BIRTH] = day;
      object[MONTH_OF_BIRTH] = month;
      object[YEAR_OF_BIRTH] = year;
      delete object[DOB];
    }

    if (typeof object[key] === 'object') {
      parseSubmitTruliooDateFields(object[key]);
    }
  }

  return object;
};

const parseTruliooFields = (formData) => {
  const truliooFields = {};
  for (const key of Object.keys(formData)) {
    if (reservedFormDataKeys.includes(key)) {
      truliooFields[key] = formData[key];
    }
  }

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
          Type: constantNationalIds[countryCode].find((natIds) => natIds.name === nationalIds.Type).type,
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
  for (const key of Object.keys(whiteListedTruliooFields)) {
    const keyExists = Object.prototype.hasOwnProperty.call(fields, key);
    // key is not contained in fields
    if (!keyExists) {
      continue;
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
        const whiteListedRequiredFields = fields.required.filter((requiredField) => childProperties.includes(requiredField));
        whiteListedComputedFields.required = whiteListedRequiredFields;
      }

      getWhiteListedFieldsOnly(fields[key], whiteListedTruliooFields[key], whiteListedComputedFields[key]);
    } else {
      whiteListedComputedFields[key] = fields[key];
    }
  }

  return whiteListedComputedFields;
};

const parseFormData = (form) => {
  if (form === undefined || form.TruliooFields === undefined) {
    return form;
  }

  if (form.TruliooFields.Document) {
    const documentFront = form.TruliooFields.Document.DocumentFrontImage;
    form.TruliooFields.Document.DocumentFrontImage = documentFront.slice(documentFront.indexOf(',') + 1);
    const documentBack = form.TruliooFields.Document.DocumentBackImage;
    if (documentBack) {
      form.TruliooFields.Document.DocumentBackImage = documentBack.slice(documentBack.indexOf(',') + 1);
    }

    const livePhoto = form.TruliooFields.Document.LivePhoto;
    if (livePhoto) {
      form.TruliooFields.Document.LivePhoto = livePhoto.slice(livePhoto.indexOf(',') + 1);
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

  const containsReservedKeys = R.intersection(Object.keys(additionalFields.properties), reservedFormDataKeys);
  if (containsReservedKeys.length > 0) {
    throw new Error(`${containsReservedKeys.toString()} is a reserved field key. Please use different naming for your additional fields.`);
  }
};

const parseConsents = (consents) => {
  const result = [];
  if (consents === undefined) {
    return result;
  }

  for (const x of Object.keys(consents)) {
    /* istanbul ignore else */
    if (consents[x]) {
      result.push(x);
    }
  }

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

export const getFields = {
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
