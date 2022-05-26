import { makeStyles } from '@mui/styles';

const styles = () => ({
  autocomplete: {
    padding: 0,
    '& .MuiFilledInput-root': {
      paddingTop: '8px !important',
      paddingBottom: '8px !important',
      borderRadius: '12px',
      '& .MuiInputAdornment-root': {
        marginTop: '0px !important',
      },
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'CountrySelect' });
