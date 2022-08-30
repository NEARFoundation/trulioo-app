import { Box, Button } from '@mui/material';
import { useStoreActions } from 'easy-peasy';

import FaceId from '../../images/face_id.jpg';

import { useStyles } from './WelcomePage.styles';


const WelcomePage = () => {
  const classes = useStyles();
  const onChangeStatus = useStoreActions((actions) => actions.general.onChangeStatus);
  const onGetCountries = useStoreActions((actions) => actions.general.onGetCountries);

  const handleGetStarted = () => {
    onGetCountries();
    onChangeStatus({ status: 'country_select' });
  };

  return (
    <Box sx={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
      <Box className={classes.grid}>
        <Box display="flex" justifyContent="center">
          <Box className={classes.textBlock}>
            <Box className={classes.title}>
              <Box component="h2" sx={{ fontWeight: [700], fontSize: 60, m: 0 }}>
                Let's verify
              </Box>
              <Box component="h2" sx={{ fontWeight: [700], fontSize: 60, m: 0 }}>
                your identity
              </Box>
            </Box>
            <Box display="flex" sx={{ paddingRight: 2, paddingLeft: 2, mt: 4 }}>
              <Button
                sx={{
                  borderRadius: 3,
                  p: '12px 37px',
                }}
                color="primary"
                variant="contained"
                onClick={handleGetStarted}
                disableElevation
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <img src={FaceId} alt="Face id" width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
