import React, { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Box, Button, Typography } from '@mui/material';
import Man from '../../general/img/man.png';
import Hand from '../../general/img/hand.png';
import { useStyles } from './CheckVerification.styles';
import { MagicSpinner } from 'react-spinners-kit';

const CheckVerification = ({ status, redirectUrl }) => {
  const { onGetSession } = useStoreActions((actions) => actions.general);
  const isInProgress =
    status === 'identity_verification_in_progress' ||
    status === 'document_verification_in_progress';
  const isCompleted =
    status === 'identity_verification_completed' || status === 'document_verification_completed';

  const isFailed =
    status === 'document_verification_failed' || status === 'identity_verification_failed';

  const classes = useStyles();
  const [counter, setCounter] = useState(0);

  const startCounter = () => {
    setCounter(counter + 1);
  };
  const stopCounter = () => {
    setCounter(0);
  };

  const handleReset = () => {
    onGetSession({ forced: true });
  };

  useEffect(() => {
    let timer;
    if (counter) {
      timer = setTimeout(() => {
        setCounter(counter + 1);
        onGetSession();
      }, 30000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  if (!counter && isInProgress) {
    startCounter();
  }
  if (counter && isCompleted) {
    stopCounter();
  }

  const handleSubmit = () => {
    window.open(redirectUrl, '_blank');
  };

  return (
    <>
      {isInProgress && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <Box>
                <MagicSpinner color="#555" loading={true} />
              </Box>
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Thank you! We are currently checking your data
                </Typography>
                <Typography variant="body2" className={classes.formDescription}>
                  This may take a few seconds...
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {isFailed && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <img className={classes.img} src={Man} alt="Rejected" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Your account has been rejected
                </Typography>
                <Typography variant="body2" className={classes.formDescription}>
                  Sorry, but your data is invalid.
                </Typography>
              </Box>
              <Box className={classes.formFooter}>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  disableElevation
                  onClick={handleReset}
                >
                  Try again
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {status === 'document_verification_completed' && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <img className={classes.img} src={Hand} alt="Approved" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Your account has been approved.
                </Typography>
                <Typography variant="body2" className={classes.formDescription}>
                  Now you can go to the next step.
                </Typography>
              </Box>
              <Box className={classes.formFooter}>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CheckVerification;
