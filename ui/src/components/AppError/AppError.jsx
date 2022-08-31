/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography } from '@mui/material';

import ErrorIcon from '../general/img/error.png';

import { useStyles } from './AppError.styles';

const AppError = ({ description }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.form}>
          <img className={classes.img} src={ErrorIcon} alt="Error" />
          <Box className={classes.formHeader}>
            <Typography className={classes.formTitle} variant="h6">
              An error has occurred.
            </Typography>
            <Typography variant="body2" className={classes.formDescription}>
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppError;
