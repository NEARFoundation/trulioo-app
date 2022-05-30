import { makeStyles } from '@mui/styles';

const styles = (theme) => ({
  root: {
    width: 580,
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    '& form .MuiFormControl-fullWidth': {},
  },
  footer: {
    display: 'flex',
    position: 'absolute',
    marginTop: 'auto',
    gap: 24,
    width: '100%',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 0',
    background: '#fff',
    borderTop: '1px solid #e7ebf0',
  },
  submitBtn: {
    padding: '8px 56px !important',
    borderRadius: '12px !important',
  },
});

export const useStyles = makeStyles(styles, { name: 'IdentityVerification' });
