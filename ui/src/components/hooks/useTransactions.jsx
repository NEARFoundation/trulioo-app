import React, { useEffect, useState } from 'react';
import { api } from '../../config/api';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const useTransactions = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', hide: true, width: 90 },
    {
      field: 'transactionId',
      headerName: 'transactionId',
      width: 150,
      flex: 1,
      editable: true,
    },
    {
      field: 'Details',
      headerName: '',
      width: 90,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      editable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            component={Link}
            size="small"
            style={{ flex: 1 }}
            disableElevation
            to={params.row.transactionId}
          >
            Details
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await api.requestTransactions();
      if (data) {
        setRows(data);
      }
    })();
    return () => setRows([]);
  }, []);

  return { rows, columns };
};
