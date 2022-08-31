/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Stepper, Step, StepButton, Box } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';

import IdentityVerification from '../IdentityVerification/IdentityVerification';

import CheckVerification from './CheckVerification/CheckVerification';
import TruliooEmbedId from './TruliooEmbedId/TruliooEmbedId';

const stepperSteps = [
  { label: 'Select Country', value: 'country_select' },
  { label: 'Identity verification', value: 'identity_verification' },
  { label: 'Document verification', value: 'document_verification' },
];

const statusToStep = (status) => {
  const steps = {
    select_country: 'select_country',
    identity_verification: 'identity_verification',
    identity_verification_in_progress: 'identity_verification',
    identity_verification_failed: 'identity_verification',
    identity_verification_completed: 'document_verification',
    document_verification_in_progress: 'document_verification',
    document_verification_failed: 'document_verification',
  };
  return steps[status];
};

const stepIcons = {
  identity_verification: <PanoramaFishEyeIcon color="primary" />,
  identity_verification_in_progress: <AccessTimeIcon color="primary" />,
  identity_verification_completed: <PanoramaFishEyeIcon color="primary" />,
  identity_verification_failed: <CancelIcon sx={{ color: '#F52020' }} />,
  document_verification: <CancelIcon sx={{ color: '#F52020' }} />,
  document_verification_in_progress: <AccessTimeIcon color="primary" />,
  document_verification_failed: <CancelIcon sx={{ color: '#F52020' }} />,
  document_verification_completed: <PanoramaFishEyeIcon color="primary" />,
  default: <PanoramaFishEyeIcon color="primary" />,
};

const KYCSteps = ({ loading, status }) => {
  const onGetAppConfig = useStoreActions((actions) => actions.general.onGetAppConfig);

  const { trulioo_public_key, finish_redirect_url } = useStoreState((state) => state.general.appConfig);
  const [step, setStep] = useState(null);
  const isFinished = status === 'document_verification_completed';
  const isCheckProcess =
    status === 'identity_verification_in_progress' ||
    status === 'identity_verification_failed' ||
    status === 'document_verification_in_progress' ||
    status === 'document_verification_failed' ||
    status === 'document_verification_completed';

  useEffect(() => {
    (async () => {
      await onGetAppConfig();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setStep(statusToStep(status));
    })();
  }, [status]);

  const activeStep = () => {
    return stepperSteps.findIndex((item) => item.value === step);
  };

  const completedSteps = (index) => {
    return index < activeStep();
  };

  const getStepIcon = (stepIconStatus, index) => {
    if (activeStep() === index) return stepIcons[stepIconStatus];
    if (completedSteps(index)) return null;
    return stepIcons.default;
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
      {!isFinished && (
        <Stepper sx={{ maxWidth: 580, marginTop: 4 }} activeStep={activeStep()} alternativeLabel>
          {stepperSteps.map((stepperStep, index) => (
            <Step key={stepperStep.label}>
              <StepButton color="inherit" icon={getStepIcon(status, index)}>
                {stepperStep.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      )}
      {status && (
        <Box display="flex" flexDirection="column" sx={{ width: 1, height: 1 }}>
          {status === 'identity_verification' && <IdentityVerification loading={loading} />}
          {isCheckProcess && <CheckVerification status={status} redirectUrl={finish_redirect_url} />}
          {status === 'identity_verification_completed' && trulioo_public_key && <TruliooEmbedId publicKey={trulioo_public_key} />}
        </Box>
      )}
    </Box>
  );
};

export default KYCSteps;
