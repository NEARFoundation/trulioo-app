/* eslint-disable react/react-in-jsx-scope */
import Box from '@mui/material/Box';
import { cloneElement, useEffect, useState } from 'react';

import Loader from '../../components/general/Loader/Loader';

export const Initializer = ({ store, children }) => {
  const [isInit, setInit] = useState(false);
  const actions = store.getActions();
  const onInitApp = actions.general.onInitApp;

  useEffect(() => {
    (async () => {
      await store.persist.resolveRehydration();
      onInitApp({ setInit });
    })();
  }, [store, setInit]);

  return isInit ? (
    cloneElement(children)
  ) : (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Loader />
    </Box>
  );
};
