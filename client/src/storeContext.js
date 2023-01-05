import React, {createContext, useContext} from 'react'
import { store } from './store';
import { useLocalObservable } from 'mobx-react-lite';

const StoreContext = createContext(null);

export const StoreProvider = ({children}) => {
  const userStore = useLocalObservable(store);
  return <StoreContext.Provider value={userStore}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
