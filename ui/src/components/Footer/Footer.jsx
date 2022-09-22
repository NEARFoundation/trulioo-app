import { Box, Link } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
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
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <Box
        sx={{
          paddingRight: '16px',
          paddingLeft: '16px',
          backgroundColor: '#F7F7F7',
          color: '#000',
          borderTop: '1px solid #E1E1E1',
        }}
        py={6}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        className={classes.rootBox}
      >
        <Box component="nav" className={classes.footerNav}>
          <Link href="/privacy-policy" variant="body1" color="textPrimary" className={classes.footerLink}>
            Privacy Policy
          </Link>
        </Box>
      </Box>
    </footer>
  );
}
