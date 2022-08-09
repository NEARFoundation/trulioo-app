import React, { useEffect, useState } from 'react';
import { api } from '../../config/api';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';

export const useOneTimeUrls = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', hide: true, width: 90 },
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
      flex: 1,
      editable: true,
      renderCell: ({ value }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
            <CopyToClipboard text={value}>
              <IconButton size="small">
                <ContentCopyIcon className="cellHeader" fontSize="small" />
              </IconButton>
            </CopyToClipboard>
          </Box>
        );
      },
    },
    {
      field: 'codeTimestamp',
      headerName: 'codeTimestamp',
      width: 90,
      flex: 1,
      type: 'date',
      renderCell: ({ value }) => {
        const date = new Date(value);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
            <span>{date.toISOString()}</span>
          </Box>
        );
      },
      editable: true,
    },
    {
      field: 'expiryDate',
      headerName: 'expiryDate',
      width: 90,
      flex: 1,
      type: 'date',
      renderCell: ({ value }) => {
        const date = new Date(value);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
            <span>{date.toISOString()}</span>
          </Box>
        );
      },
      editable: true,
    },
    {
      field: 'enabled',
      headerName: 'enabled',
      width: 90,
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
            to={params.row.id}
          >
            Details
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await api.requestOneTimeUrls();
      if (data) {
        setRows(data);
      }
    })();
    return () => setRows([]);
  }, []);

  return { rows, columns };
};
