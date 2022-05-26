import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  wrapper: {
    display: 'flex',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#fff',
  },
  form: {
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
  },
  formHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formTitle: {
    fontSize: '20px !important',
    fontWeight: [700],
  },
  inputGroup: {
    marginBottom: '24px !important',
    textAlign: 'left',
    '& .MuiDivider-root::before': {
      width: '0 !important',
    },
  },
  select: {
    '& .MuiFilledInput-root': {
      borderRadius: 4,
    },
  },
  formFooter: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    paddingRight: '49px !important',
    paddingLeft: '49px !important',
    borderRadius: 12,
  },
});

export const useStyles = makeStyles(styles, { name: 'CreateApplicant' });
