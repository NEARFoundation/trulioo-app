import { Box, Link } from '@mui/material';
import React from 'react';

import { useStyles } from './Footer.styles';

export default function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <Box
        sx={{
          paddingRight: '16px',
          paddingLeft: '16px',
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
