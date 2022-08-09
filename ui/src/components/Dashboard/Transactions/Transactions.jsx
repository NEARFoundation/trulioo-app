import { Container } from '@mui/material';
import React from 'react';
import { useStyles } from './Transactions.styles';
import { Outlet } from 'react-router-dom';

const Transactions = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Outlet />
      </Container>
    </>
  );
};

export default Transactions;
