import Form, { useMuiComponent } from '@rjsf/material-ui/v5';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

export const IdentityVerification = () => {
  const schema = useStoreState((state) => state.general.schema);
  const onChangeStatus = useStoreActions((actions) => actions.general.onChangeStatus);

  const handleBackward = () => {
    onChangeStatus('country_select');
  };

  const onSubmit = ({ formData }, e) => console.log('Data submitted: ', formData);

  const TextWidget = (props) => {
    const { options, ...otherProps } = props;
    const { color, backgroundColor } = options;
    return (
      <TextField
        variant="filled"
        InputProps={{ disableUnderline: true }}
        {...otherProps}
        style={{ color }}
      />
    );
  };

  const ObjectFieldTemplate = (props) => {
    return (
      <div>
        <Divider textAlign="left" sx={{ mb: 2 }}>
          {props.title}
        </Divider>
        {props.description}
        {props.properties.map((element) => (
          <Box sx={{ mb: 2 }} className="property-wrapper">
            {element.content}
          </Box>
        ))}
      </div>
    );
  };

  const uiSchema = {
    PersonInfo: {
      'ui:ObjectFieldTemplate': ObjectFieldTemplate,
      FirstGivenName: {
        'ui:widget': TextWidget,
      },
      MiddleName: {
        'ui:widget': TextWidget,
      },
      FirstSurName: {
        'ui:widget': TextWidget,
      },
      Gender: {
        'ui:widget': TextWidget,
      },
    },
    Communication: {
      EmailAddress: {
        'ui:widget': TextWidget,
      },
    },
  };

  console.log(schema);

  return (
    <>
      {schema ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box sx={{ width: 580, backgroundColor: '#fff', p: 2 }}>
            <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit}>
              <Box>
                <Button onClick={handleBackward}>Back</Button>
                <Button type="submit" variant="outlined">
                  Next
                </Button>
              </Box>
            </Form>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default IdentityVerification;
