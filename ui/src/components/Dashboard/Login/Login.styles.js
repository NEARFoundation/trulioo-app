import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  formWrapper: {
    margin: '0 auto',
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    gap: theme.spacing(3),
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  formHeader: {
    fontWeight: 400,
    fontSize: '1.5rem!important',
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  icon: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRadius: '50%',
  },
});

export const useStyles = makeStyles(styles, { name: 'LoginPage' });
