import React, { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Box, Button, Typography } from '@mui/material';
import Man from '../../general/img/man.png';
import Hand from '../../general/img/hand.png';
import { useStyles } from './CheckVerification.styles';
import { MagicSpinner } from 'react-spinners-kit';

const CheckVerification = ({ status }) => {
  const { onGetSession, setSession } = useStoreActions((actions) => actions.general);
  // const state = useStoreState((state) => state);
  //const navigate = useNavigate();
  //const sessionStatus = state.general.session.status;

  const classes = useStyles();
  const [counter, setCounter] = useState(0);

  const startCounter = () => {
    setCounter(counter + 1);
  };
  const stopCounter = () => {
    setCounter(0);
  };

  const handleReset = () => {
    setSession({ status: 'new', isRejected: true });
  };

  useEffect(() => {
    let timer;
    if (counter)
      timer = setTimeout(() => {
        setCounter(counter + 1);
        onGetSession();
      }, 30000);

    return () => clearTimeout(timer);
  }, [counter]);

  if (!counter && status === 'identity_verification_in_progress') {
    startCounter();
  }
  if (counter && status === 'account_is_whitelisted') {
    stopCounter();
  }

  const handleSubmit = () => {
    //navigate('/');
  };

  return (
    <>
      {status === 'identity_verification_in_progress' && (
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
      {status === 'identity_verification_failed' && (
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
            </Box>
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
      )}
      {status === 'account_is_whitelisted' && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <img className={classes.img} src={Hand} alt="Approved" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Your account has been approved.
                </Typography>
                <Typography variant="body2" className={classes.formDescription}>
                  Now you can submit DAO proposal to get paid.
                </Typography>
              </Box>
            </Box>
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
      )}
    </>
  );
};

export default CheckVerification;
