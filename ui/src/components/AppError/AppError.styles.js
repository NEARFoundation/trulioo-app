import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#f7f7f7',
  },
  container: {
    maxWidth: '100%',
    width: 560,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    marginTop: theme.spacing(8),
    background: '#fff',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: 72,
    height: 72,
  },
  formHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formTitle: {
    fontSize: '20px !important',
    fontWeight: '700 !important',
  },
  formDescription: {
    color: '#555',
    textAlign: 'left',
    fontSize: '16px !important',
  },
  formFooter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  button: {
    paddingRight: '49px !important',
    paddingLeft: '49px !important',
  },
});

export const useStyles = makeStyles(styles, { name: 'AppError' });
