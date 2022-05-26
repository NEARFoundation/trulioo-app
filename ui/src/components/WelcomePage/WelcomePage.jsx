import FaceId from '../../images/face_id.jpg';
import { Box, Button } from '@mui/material';
import { useStyles } from './WelcomePage.styles';
import { useStoreActions } from 'easy-peasy';

const WelcomePage = () => {
  const classes = useStyles();
  const onChangeStatus = useStoreActions((actions) => actions.general.onChangeStatus);

  const handleGetStarted = (e) => {
    e.preventDefault();
    onChangeStatus('country_select');
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
            <Box display="flex" sx={{ paddingRight: 2, paddingLeft: 2 }}>
              <Button
                sx={{
                  borderRadius: 3,
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
