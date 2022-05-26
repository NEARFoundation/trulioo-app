import { DAY_OF_BIRTH, MONTH_OF_BIRTH, YEAR_OF_BIRTH, DOB, DOB_TITLE } from './constantDateFields';

const defFields = () => ({
  title: 'DataFields',
  type: 'object',
  properties: {
    PersonInfo: {
      title: 'PersonInfo',
      type: 'object',
      properties: {
        FirstGivenName: {
          type: 'string',
        },
        MiddleName: {
          type: 'string',
        },
        FirstSurName: {
          type: 'string',
        },
        DayOfBirth: {
          type: 'int',
        },
        MonthOfBirth: {
          type: 'int',
        },
        YearOfBirth: {
          type: 'int',
        },
        Gender: {
          type: 'string',
        },
      },
      required: ['FirstGivenName', 'FirstSurName', 'DayOfBirth', 'MonthOfBirth', 'YearOfBirth'],
    },
    Location: {
      title: 'Location',
      type: 'object',
      properties: {
        BuildingNumber: {
          type: 'string',
        },
        UnitNumber: {
          type: 'string',
        },
        StreetName: {
          type: 'string',
        },
        StreetType: {
          type: 'string',
        },
        Suburb: {
          type: 'string',
        },
        StateProvinceCode: {
          type: 'string',
        },
        PostalCode: {
          type: 'string',
        },
      },
      required: ['BuildingNumber', 'PostalCode', 'StateProvinceCode', 'StreetName'],
    },
    Communication: {
      title: 'Communication',
      type: 'object',
      properties: {
        MobileNumber: {
          type: 'string',
        },
        Telephone: {
          type: 'string',
        },
        EmailAddress: {
          type: 'string',
        },
      },
      required: [],
    },
    DriverLicence: {
      title: 'DriverLicence',
      type: 'object',
      properties: {
        Number: {
          type: 'string',
        },
      },
      required: ['Number'],
    },
    Passport: {
      title: 'Passport',
      type: 'object',
      properties: {
        Number: {
          type: 'string',
        },
      },
      required: ['Number'],
    },
  },
});

const dateFieldsMap = new Map();
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const dateFields = ['DayOfBirth', 'MonthOfBirth', 'YearOfBirth'];

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

export const utils = {
  defFields,
  deepCopy,
  parseFields,
  parseFieldDates,
  updateDateRequiredArray,
};
