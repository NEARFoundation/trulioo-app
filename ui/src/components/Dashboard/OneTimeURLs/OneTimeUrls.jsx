import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useStyles } from '../Transactions/Transactions.styles';
import React from 'react';

const OneTimeUrls = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Outlet />
      </Container>
    </>
  );
};

export default OneTimeUrls;
