import { action, makeObservable, observable } from 'mobx';
import { isHydrated, isPersisting, makePersistable } from 'mobx-persist-store';

export class Store {
  username = null;
  token = null;
  
  setUsername(username) {
    this.username = username;
  };

  setToken(token) {
    this.token = token;
  };

  get isHydrated() {
    return isHydrated(this);
  }
  get isPersisting() {
    return isPersisting(this);
  }

  constructor () {
    makeObservable(this, {
      username: observable,
      token: observable,
      setUsername: action,
      setToken: action,
    });
    makePersistable(
      this,
      { name: 'Store', properties: ['username', 'token'], storage: window.localStorage }
    );
  }
};

// export const store = () => {
//   return {
//     username: null,
//     token: null,
//     setUsername(username) {
//       this.username = username;
//     },
//     setToken(token) {
//       this.token = token;
//     },
//   };
// };


