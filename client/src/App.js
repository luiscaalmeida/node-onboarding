import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './store';
import {persistStore} from 'redux-persist';
// HOOKS
import {useToken} from './hooks/useToken';
// COMPONENTS
import {PlaylistsPage} from './pages/PlaylistsPage';
import {ProfilePage} from './pages/ProfilePage';
import {LoggedOutPage} from './pages/LoggedOutPage';
import {RegisterPage} from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage';
import {HomePage} from './pages/HomePage';
import {MediaDetailPage} from './pages/MediaDetailPage';
import {MediaListPage} from './pages/MediaListPage';
// CONSTS
import {MOVIE_TYPE, TVSERIE_TYPE} from './consts';
// CSS
import './App.css';

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
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </BrowserRouter>
          )
          : (
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<LoggedOutPage />} />
                <Route path="/login" element={<LoginPage setToken={setToken} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
          </BrowserRouter>
          )
        }
      </PersistGate>
    </Provider>
  )
};
