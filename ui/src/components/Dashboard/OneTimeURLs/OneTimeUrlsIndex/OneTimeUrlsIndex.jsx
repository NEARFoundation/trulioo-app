import { useOneTimeUrls } from '../../../hooks/useOneTimeUrls';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';

const OneTimeUrlsIndex = () => {
  const { rows, columns } = useOneTimeUrls();
  const [selectionModel, setSelectionModel] = React.useState([]);

  return (
    <>
      <Typography variant="h3" sx={{ mb: 2 }}>
        One Time Urls
      </Typography>
      <Box sx={{ height: 400, minHeight: 400 }}>
        {rows && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={50}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
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

export default OneTimeUrlsIndex;
