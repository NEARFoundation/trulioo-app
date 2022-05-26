import { TextField } from '@mui/material';
import { useStyles } from './Input.styles';
import { ErrorMessage } from '@hookform/error-message';

const Input = (props) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.input}
        required
        id={`filled-${props.name}`}
        fullWidth
        inputRef={props.inputRef || null}
        type={props.type}
        label={props.label}
        variant="filled"
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{
          shrink: true,
          style: { fontSize: 14 },
        }}
        {...props.register(props.name)}
      />
      {props.errors && (
        <ErrorMessage
          errors={props.errors}
          name={props.name}
          as={<span className="error-message" style={{ color: 'red' }} />}
        />
      )}
    </>
  );
};

export default Input;
