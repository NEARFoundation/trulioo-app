/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Divider, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Form from '@rjsf/material-ui/v5';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';

import Loader from '../general/Loader/Loader';

import { useStyles } from './IdentityVerification.styles';

export const IdentityVerification = ({ loading }) => {
  const classes = useStyles();
  const [submitLoading, setSubmitLoading] = useState(false);
  const onChangeStatus = useStoreActions((actions) => actions.general.onChangeStatus);
  const setError = useStoreActions((actions) => actions.general.setError);
  const fields = useStoreState((state) => state.general.getFields);
  const countries = useStoreState((state) => state.general.countries);
  const onSubmitForm = useStoreActions((actions) => actions.general.onSubmitForm);

  const mapStateToProps = (state) => {
    const schema = {
      type: 'object',
      properties: {
        countries: {
          title: 'Selected country',
          type: 'string',
          readOnly: true,
          enum: state.countries.map((item) => item.code),
          enumNames: state.countries.map((item) => item.code) && state.countries.map((item) => item.name),
        },
      },
    };
    if (state.fields && state.fields.fields && state.fields.fields.properties) {
      schema.properties.TruliooFields = {
        title: 'Properties',
        type: 'object',
        properties: state.fields && state.fields.fields && state.fields.fields.properties,
      };
      if (state.fields.additionalFields) {
        schema.properties = { ...schema.properties, ...state.fields.additionalFields };
      }

      if (state.fields.consents) {
        schema.properties.Consents = state.fields.consents;
      }
    }

    return {
      fields: state.fields,
      schema,
      formData: state.fields.formData,
    };
  };

  let formProps;
  if (fields && countries) {
    formProps = mapStateToProps({ fields, countries });
  }

  const handleBackward = () => {
    onChangeStatus({ status: 'country_select' });
  };

  const handleError = (error) => {
    let _description = '';
    for (const item of error) {
      _description += item.stack + '\r\n';
    }

    setError({ isError: true, description: _description });
  };

  const onSubmit = ({ formData }) => {
    onSubmitForm({ formData, setSubmitLoading });
  };

  const ObjectFieldTemplate = (props) => {
    return (
      <div>
        <Divider textAlign="left" sx={{ mb: 2 }}>
          {props.title}
        </Divider>
        {props.description}
        {props.properties.map((element, index) => (
          <Box key={'field-' + index} sx={{ mb: 2 }} className="property-wrapper">
            {element.content}
          </Box>
        ))}
      </div>
    );
  };

  const CountryWidget = (props) => {
    const handleChangeCountry = () => {
      onChangeStatus({ status: 'country_select' });
    };

    return (
      <TextField
        label={props.label}
        select
        variant="filled"
        className="custom"
        value={props.value}
        required={props.required}
        disabled
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${props.value.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${props.value.toLowerCase()}.png 2x`}
                alt={props.value}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={handleChangeCountry} sx={{ mr: 2, fontWeight: [700] }}>
                Edit
              </Button>
            </InputAdornment>
          ),
        }}
      >
        {props.options.enumOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const uiSchema = {
    countries: {
      'ui:widget': CountryWidget,
    },
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        {loading ? (
          <Box dispaly="flex" alignItems="center">
            <Loader />
          </Box>
        ) : (
          <>
            {formProps ? (
              <Box className={classes.root}>
                <Typography component="h2" sx={{ fontSize: '20px', fontWeight: '700', letterSpacing: 0.15 }}>
                  Identity verification
                </Typography>
                <Form
                  schema={formProps.schema}
                  uiSchema={uiSchema}
                  ObjectFieldTemplate={ObjectFieldTemplate}
                  formData={formProps.formData}
                  onSubmit={onSubmit}
                  onError={handleError}
                >
                  <Box className={classes.footer}>
                    <Button onClick={handleBackward}>Back</Button>
                    <LoadingButton className={classes.submitBtn} type="submit" variant="contained" disableElevation loading={submitLoading}>
                      Next
                    </LoadingButton>
                  </Box>
                </Form>
              </Box>
            ) : null}
          </>
        )}
      </Box>
    </>
  );
};

export default IdentityVerification;
