import { Box, Typography } from '@mui/material';
import React from 'react';
import { MagicSpinner } from 'react-spinners-kit';

// eslint-disable-next-line import/extensions
import { useStyles } from './Loader.styles';

const Loader = () => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.form}>
          <Box className={classes.loader}>
            <MagicSpinner color="#555" loading={true} />
          </Box>
          <Typography sx={{ color: '#555' }}>Loading...</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Loader;
