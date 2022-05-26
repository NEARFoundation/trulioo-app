import { cloneElement, useEffect, useState } from 'react';

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

  return isInit ? cloneElement(children) : <div>Loading...</div>;
};
