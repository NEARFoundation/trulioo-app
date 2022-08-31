/* eslint-disable react/react-in-jsx-scope */
import { ErrorMessage } from '@hookform/error-message';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Autocomplete, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { useStyles } from './CountrySelect.styles';

const CountrySelect = (props) => {
  const { control, name, errors } = props;
  const [open, setOpen] = useState(false);
  const country = useStoreState((state) => state.general.country);
  const countriesArray = useStoreState((state) => state.general.countries);
  const loading = open && countriesArray.length === 0;

  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(_, data) => {
            onChange(data?.code ?? '');
            return data;
          }}
          defaultValue={countriesArray.find((item) => item.code === country)}
          id="country"
          className={classes.autocomplete}
          options={countriesArray}
          loading={loading}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          autoHighlight
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt={option.name}
              />
              {option.name}
            </Box>
          )}
          renderInput={(parameters) => (
            <>
              <TextField
                {...parameters}
                placeholder="Select"
                InputLabelProps={{ shrink: false }}
                variant="filled"
                fullWidth
                InputProps={{
                  ...parameters.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {parameters.InputProps.endAdornment}
                    </>
                  ),
                  disableUnderline: true,
                }}
              />
              {errors && <ErrorMessage errors={errors} name={name} as={<span className="error-message" style={{ color: 'red' }} />} />}
            </>
          )}
        />
      )}
    />
  );
};

export default CountrySelect;
