import {createContext} from 'react'
import { Store } from './store';

// const StoreContext = createContext(null);

// const store = new Store();

// export const StoreProvider = ({children}) => {
//   const userStore = useLocalObservable(store);
//   return <StoreContext.Provider value={userStore}>{children}</StoreContext.Provider>;
// }

// export const useStore = () => useContext(StoreContext);
const store = new Store();
export const StoreContext = createContext(store);
