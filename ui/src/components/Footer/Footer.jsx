import { Box, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useStyles } from './Footer.styles';

export default function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <Box py={6} display="flex" flexWrap="wrap" alignItems="center" className={classes.footerContainer}>
        <Box component="nav" className={classes.footerNav}>
          <Link component={RouterLink} to="/privacy-policy" variant="body1" color="textPrimary" className={classes.footerLink}>
            Privacy Policy
          </Link>
        </Box>
      </Box>
    </footer>
  );
}
