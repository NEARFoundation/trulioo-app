import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  grid: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr minmax(386px, 1fr)',
    flex: 'auto',
    maxWidth: 800,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  description: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

export const useStyles = makeStyles(styles, { name: 'PrivacyPolicy' });
