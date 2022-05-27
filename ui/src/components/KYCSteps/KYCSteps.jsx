import { useEffect, useState } from 'react';
import { Stepper, Step, StepButton, Box } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import { pink } from '@mui/material/colors';
import { useStoreState } from 'easy-peasy';
//import CreateApplicant from './CreateApplicant/CreateApplicant';
import IdentityVerification from '../IdentityVerification/IdentityVerification';
//import VerifyAccount from './VerifyAccount/VerifyAccount';
//import CheckVerification from './CheckVerification/CheckVerification';

const steps = [
  { label: 'Select Country', value: 'country_select' },
  { label: 'Identity verification', value: 'identity_verification' },
  { label: 'Verify you account', value: 'verify' },
  { label: 'Submit your proposal', value: 'proposal' },
];

function statusToStep(status) {
  const steps = {
    select_country: 'select_country',
    new: 'new',
    identity_verification: 'identity_verification',
    registered: 'verify',
    registered_token: 'verify',
    verification_in_progress: 'verify',
    applicant_was_rejected: 'verify',
    account_is_whitelisted: 'proposal',
  };
  return steps[status];
}

const stepIcons = {
  new: <PanoramaFishEyeIcon color="primary" />,
  registered: <PanoramaFishEyeIcon color="primary" />,
  identity_verification: <PanoramaFishEyeIcon color="primary" />,
  registered_token: <PanoramaFishEyeIcon color="primary" />,
  verification_in_progress: <AccessTimeIcon color="primary" />,
  account_is_whitelisted: <PanoramaFishEyeIcon color="primary" />,
  applicant_was_rejected: <CancelIcon sx={{ color: pink[500] }} />,
  default: <PanoramaFishEyeIcon color="primary" />,
};

const KYCSteps = ({ loading, status }) => {
  const [step, setStep] = useState(null);
  const { isRejected } = useStoreState((state) => state.general);
  const onfidoToken = null;

  useEffect(() => {
    (async () => {
      if (!isRejected) {
        if (status === 'registered') {
          // await onRegisterSession();
          if (!onfidoToken) {
            //   await onGenerateSDKToken();
          }
        }
      }
      setStep(statusToStep(status));
    })();
  }, [status]);

  const activeStep = () => {
    return steps.findIndex((item) => item.value === step);
  };

  const completedSteps = (index) => {
    return index < activeStep();
  };

  const getIcon = (status, index) => {
    if (activeStep() === index) return stepIcons[status];
    if (completedSteps(index)) return null;
    return stepIcons['default'];
  };

  return (
    <Box
      id="stepper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stepper sx={{ maxWidth: 580, marginTop: 4 }} activeStep={activeStep()} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton color="inherit" icon={getIcon(status, index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {status && (
        <Box display="flex" flexDirection="column" sx={{ width: 1, height: 1 }}>
          {status === 'identity_verification' && <IdentityVerification loading={loading} />}
          {/* {status === 'registered_token' && <VerifyAccount />}
                    {status === 'verification_in_progress' && <CheckVerification />}
          {status === 'account_is_whitelisted' && <CheckVerification />}
          {status === 'applicant_was_rejected' && <CheckVerification />}*/}
        </Box>
      )}
    </Box>
  );
};

export default KYCSteps;
