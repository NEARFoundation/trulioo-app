/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable id-length */
import { Modal, Box, Typography, Button } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid rgb(62 80 96)',
  boxShadow: 24,
  p: 4,
};

const Message = () => {
  const { isError, description } = useStoreState((state) => state.general.error);
  const setError = useStoreActions((actions) => actions.general.setError);
  const handleClose = () => {
    setError({ isError: false, description: '' });
  };

  return (
    <div>
      <Modal open={isError} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Something went wrong...
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleClose} disableElevation sx={{ borderRadius: '12px' }}>
              Got it
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Message;
