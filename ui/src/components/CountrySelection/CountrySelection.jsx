import { Box, Typography } from '@mui/material';
import CountrySelect from '../general/CountrySelect/CountrySelect';
import { useForm } from 'react-hook-form';
import { useStyles } from './CountrySelection.styles';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

const CountrySelection = () => {
  const onChangeStatus = useStoreActions((actions) => actions.general.onChangeStatus);
  const setCountry = useStoreActions((actions) => actions.general.setCountry);
  const onGetFields = useStoreActions((actions) => actions.general.onGetFields);

  const {
    control,
    watch,
    formState: { errors },
  } = useForm();

  const watchCountry = watch('country');

  useEffect(() => {
    if (watchCountry) {
      setCountry(watchCountry);
      onChangeStatus('identity_verification');
      onGetFields('UA');
    }
  }, [watchCountry]);

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" flex={1}>
      <Box className={classes.form}>
        <Typography component="h6" className={classes.formTitle}>
          Select your country
        </Typography>
        <CountrySelect name={'country'} control={control} errors={errors} />
      </Box>
    </Box>
  );
};

export default CountrySelection;
