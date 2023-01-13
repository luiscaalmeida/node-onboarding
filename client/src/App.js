import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
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
import {LogoutPage} from './pages/LogoutPage';
import { PersonDetailPage } from './pages/PersonDetailPage';
// CONSTS
import {MOVIE_TYPE, TVSERIE_TYPE} from './consts';
// CSS
import './App.css';

export const App = () => {
  const {token, setToken} = useToken();

  return (
    <>
      {token
        ? ( 
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MediaListPage type={MOVIE_TYPE} />} />
              <Route path="/tvs" element={<MediaListPage type={TVSERIE_TYPE} />} />
              <Route path="/movie/:id" element={<MediaDetailPage type={MOVIE_TYPE} />} />
              <Route path="/tv/:id" element={<MediaDetailPage type={TVSERIE_TYPE} />} />
              <Route path="/person/:id" element={<PersonDetailPage />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/profile/info" element={<ProfilePage edit={'info'} />} />
              <Route path="/profile/password" element={<ProfilePage edit={'pass'} />} />
              <Route path="/profile/picture" element={<ProfilePage edit={'pic'} />} />
              <Route path="/logout" element={<LogoutPage setToken={setToken} />} />
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
    </>
  )
};
