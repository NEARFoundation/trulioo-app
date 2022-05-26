import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  form: {
    width: '100%',
    height: '100%',
    minHeight: 326,
    maxWidth: 580,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formTitle: {
    fontSize: '20px !important',
    fontWeight: '700 !important',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
});

export const useStyles = makeStyles(styles, { name: 'CountrySelectionPage' });
