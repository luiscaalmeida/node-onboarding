const API_KEY = 'f1322c20e0bb9b05cf24b56bd62449d6';

const API_KEY_QUERY = `?api_key=${API_KEY}`;
const LANGUAGE_QUERY = '&language=en-US';
const BASE_QUERIES = `${API_KEY_QUERY}${LANGUAGE_QUERY}`;

const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieByIdURL = (id) => `${BASE_URL}/movie/${id}${BASE_QUERIES}`;
export const getTvSerieByIdURL = (id) => `${BASE_URL}/tv/${id}${BASE_QUERIES}`;
export const searchMoviesURL = (query) => `${BASE_URL}/search/movie${BASE_QUERIES}&query=${query}&include_adult=false`;
export const searchTVSeriesURL = (query) => `${BASE_URL}/search/tv${BASE_QUERIES}&query=${query}&include_adult=false`;
export const getMostPopularMoviesURL = () => `${BASE_URL}/movie/popular${BASE_QUERIES}&page=1`;
export const getMostPopularTvSeriesURL = () => `${BASE_URL}/tv/popular${BASE_QUERIES}&page=1`;


export const MOVIE_TYPE = 'movie';
export const TVSERIE_TYPE = 'tvserie';

export const DETAIL_FETCHERS = {
  [MOVIE_TYPE]: {key: 'getMovieByIdURL', func: getMovieByIdURL},
  [TVSERIE_TYPE]: {key: 'getTvSerieByIdURL', func: getTvSerieByIdURL},
};

export const LIST_FETCHERS = {
  [MOVIE_TYPE]: {key: 'getMostPopularMoviesURL', func: getMostPopularMoviesURL},
  [TVSERIE_TYPE]: {key: 'getMostPopularTvSeriesURL', func: getMostPopularTvSeriesURL},
};

export const SEARCH_FETCHERS = {
  [MOVIE_TYPE]: {key: 'searchMoviesURL', func: searchMoviesURL},
  [TVSERIE_TYPE]: {key: 'searchTVSeriesURL', func: searchTVSeriesURL},
};

export const SERVER_BASE_URL = 'http://localhost:3001';

export const getLocalRatingByMediaId = (id) => `${SERVER_BASE_URL}/localRating/${id}`;
export const setLocalRatingByMediaId = (id) => `${SERVER_BASE_URL}/localRating/${id}`;
export const getAllPlaylists = `${SERVER_BASE_URL}/playlist/getAllPlaylists`;
export const addMediaToPlaylist = `${SERVER_BASE_URL}/playlist/addMediaToPlaylist`;
export const logoutUrl = `${SERVER_BASE_URL}/logout`;
