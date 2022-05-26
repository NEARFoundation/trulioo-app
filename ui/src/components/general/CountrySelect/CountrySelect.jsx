import { TextField, Autocomplete, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useStyles } from './CountrySelect.styles';
import SearchIcon from '@mui/icons-material/Search';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { useStoreState } from 'easy-peasy';
import Box from '@mui/material/Box';

const CountrySelect = (props) => {
  const { control, name, errors } = props;
  const country = useStoreState((state) => state.general.country);
  // const [countriesArr, setCountries] = useState([]);

  countries.registerLocale(enLocale);

  const countryObj = countries.getNames('en', { select: 'official' });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      name: value,
      alpha3: key,
    };
  });

  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(_, data) => {
            onChange(data?.alpha3 ?? '');
            return data;
          }}
          defaultValue={countryArr.find((item) => item.alpha3 === country)}
          id="country"
          className={classes.autocomplete}
          options={countryArr}
          autoHighlight
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.alpha3 === value.alpha3}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.alpha3.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.alpha3.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                placeholder="Select"
                InputLabelProps={{ shrink: false }}
                variant="filled"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />
              {errors && (
                <ErrorMessage
                  errors={errors}
                  name={name}
                  as={<span className="error-message" style={{ color: 'red' }} />}
                />
              )}
            </>
          )}
        />
      )}
    />
  );
};

export default CountrySelect;
