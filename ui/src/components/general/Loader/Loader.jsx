import { Box } from '@mui/material';
import { useStyles } from './Loader.styles';
import { MagicSpinner } from 'react-spinners-kit';
import React from 'react';

const Loader = () => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.form}>
          <Box className={classes.loader}>
            <MagicSpinner color="#555" loading={true} />
          </Box>
          Loading...
        </Box>
      </Box>
    </Box>
  );
};

export default Loader;
