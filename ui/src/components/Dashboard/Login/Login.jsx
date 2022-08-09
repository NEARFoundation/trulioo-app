import Header from '../../Header/Header';
import React from 'react';
import { Box, Paper, Typography, Container, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStyles } from './Login.styles';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const classes = useStyles();

  return (
    <>
      <Header />
      <Box component="main" display="flex">
        <Container maxWidth="sm">
          <Box sx={{ marginTop: 4 }}>
            <Paper id="form-wrapper" variant="outlined" className={classes.formWrapper}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <LockIcon className={classes.icon} />
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  component="h1"
                  className={classes.formHeader}
                >
                  Login
                </Typography>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <TextField
                  label="Name"
                  required
                  id="name"
                  {...register('name', { required: true })}
                />
                {errors.name && errors.name.type === 'required' && <span>Name is required</span>}
                <TextField
                  id="password"
                  required
                  label="Password"
                  type="password"
                  {...register('password', { required: true })}
                />
                {errors.password && errors.password.type === 'required' && (
                  <span>Password is required</span>
                )}
                <Button type="submit" variant="contained" disableElevation>
                  Login
                </Button>
              </form>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
