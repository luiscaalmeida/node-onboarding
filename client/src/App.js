import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
// HOOKS
import {useToken} from './hooks/useToken';
// COMPONENTS

import {Login} from './components/Login/Login';
// CSS
import './App.css';
import { HomePage } from './pages/HomePage';
import { MediaDetailPage } from './pages/MediaDetailPage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { MediaListPage } from './pages/MediaListPage';
import { MOVIE_TYPE, TVSERIE_TYPE } from './consts';
import { PlaylistsPage } from './pages/PlaylistsPage';


export const App = () => {
  const {token, setToken} = useToken();
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {token
          ? ( 
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MediaListPage type={MOVIE_TYPE} />} />
                <Route path="/tvs" element={<MediaListPage type={TVSERIE_TYPE} />} />
                <Route path="/movie/:id" element={<MediaDetailPage type={MOVIE_TYPE} />} />
                <Route path="/tv/:id" element={<MediaDetailPage type={TVSERIE_TYPE} />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
              </Routes>
            </BrowserRouter>
          )
          : <Login setToken={setToken} />
        }
      </PersistGate>
    </Provider>
  )
};
