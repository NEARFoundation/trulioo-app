import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  footerContainer: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
    paddingRight: '16px',
    paddingLeft: '16px',
    color: '#000',
    borderTop: '1px solid #E1E1E1',
  },
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'Footer' });
