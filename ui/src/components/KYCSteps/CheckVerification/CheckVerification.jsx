import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Box, Button, Typography } from '@mui/material';
import Clock from '../../general/img/clock.png';
import Man from '../../general/img/man.png';
import Hand from '../../general/img/hand.png';
import { useNavigate } from 'react-router';
import { useStyles } from './CheckVerification.styles';

const CheckVerification = () => {
  const { onRegisterSession, setSession } = useStoreActions((actions) => actions.main);
  const state = useStoreState((state) => state);
  const navigate = useNavigate();
  const sessionStatus = state.main.session.status;

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
        onRegisterSession();
      }, 30000);

    return () => clearTimeout(timer);
  }, [counter]);

  if (!counter && sessionStatus === 'verification_in_progress') {
    startCounter();
  }
  if (counter && sessionStatus === 'account_is_whitelisted') {
    stopCounter();
  }

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <>
      {sessionStatus === 'verification_in_progress' && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <img className={classes.img} src={Clock} alt="Check" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Thank you! We are currently checking your data
                </Typography>
                <Typography variant="body2" className={classes.formDescription}>
                  We will send send you email with confirmation. It can take a few days...
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {sessionStatus === 'applicant_was_rejected' && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <img className={classes.img} src={Man} alt="Rejected" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Applicant was rejected.
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
      {sessionStatus === 'account_is_whitelisted' && (
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
