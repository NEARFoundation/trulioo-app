import { Box, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { useStyles } from '../Transactions.styles';
import { useTransactions } from '../../../hooks/useTransactions';

const TransactionsIndex = () => {
  const { rows, columns } = useTransactions();
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader} sx={{ mb: 2 }}>
        Transactions
      </Typography>
      <Box sx={{ height: 400, minHeight: 400 }}>
        {rows && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[5, 15, 25, 50, 100]}
            disableColumnSelector={true}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
            disableDensitySelector
          />
        )}
      </Box>
    </>
  );
};

export default TransactionsIndex;
