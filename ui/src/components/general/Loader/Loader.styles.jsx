import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
  },
  container: {
    maxWidth: 280,
    width: '100%',
    maxHeight: 208,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
    marginLeft: 16,
    marginRight: 16,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loader: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: '#ccc',
  },
});

export const useStyles = makeStyles(styles, { name: 'Loader' });
