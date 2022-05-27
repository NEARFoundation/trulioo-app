import Form from '@rjsf/material-ui/v5';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Loader from '../general/Loader/Loader';
import Typography from '@mui/material/Typography';

export const IdentityVerification = ({ loading }) => {
  const onChangeStatus = useStoreActions((actions) => actions.general.onChangeStatus);
  const onSubmitForm = useStoreActions((actions) => actions.general.onSubmitForm);
  const fields = useStoreState((state) => state.general.getFields);
  const countries = useStoreState((state) => state.general.getCountries.countries);

  const mapStateToProps = (state) => {
    const schema = {
      type: 'object',
      properties: {
        countries: {
          title: 'Countries',
          type: 'string',
          readOnly: true,
          enum: state.countries.map((item) => item.code),
          enumNames:
            state.countries.map((item) => item.code) && state.countries.map((item) => item.name),
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

  const onSubmit = ({ formData }) => {
    onSubmitForm(formData);
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
              <Box sx={{ width: 580, backgroundColor: '#fff', p: 2 }}>
                <Typography
                  component="h2"
                  sx={{ fontSize: '20px', fontWeight: '700', letterSpacing: 0.15 }}
                >
                  Identity verification
                </Typography>
                <Form
                  schema={formProps.schema}
                  ObjectFieldTemplate={ObjectFieldTemplate}
                  formData={formProps.formData}
                  onSubmit={onSubmit}
                >
                  <Box>
                    <Button onClick={handleBackward}>Back</Button>
                    <Button type="submit" variant="outlined">
                      Next
                    </Button>
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
