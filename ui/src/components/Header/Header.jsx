import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Logo from '../../images/logo.jpg';

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        paddingRight: '16px',
        paddingLeft: '16px',
        backgroundColor: '#fff',
        color: '#000',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Box
          component="img"
          sx={{
            height: 'auto',
          }}
          alt="Near KYC"
          src={Logo}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
