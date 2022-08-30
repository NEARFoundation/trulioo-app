const presetTruliooFields = (schemaObject, formDataObject) => {
  for (const [formDataKey, formDataValue] of Object.entries(formDataObject)) {
    if (schemaObject[formDataKey] && !schemaObject[formDataKey].properties) {
      schemaObject[formDataKey].default = formDataValue;
    }

    if (schemaObject[formDataKey] && schemaObject[formDataKey].properties) {
      presetTruliooFields(schemaObject[formDataKey].properties, formDataValue);
    }
  }
};

export { presetTruliooFields };
