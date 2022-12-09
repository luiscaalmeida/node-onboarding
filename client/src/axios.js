import axios from 'axios';

const baseApi = axios.create({});
baseApi.bearerToken = null;

baseApi.setBearerToken = function(token) {
    this.bearerToken = token;
    this.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

baseApi.interceptors.request.use(
    function (config) {
        // const token = localStorageService.getAccessToken()
        const token = JSON.parse(localStorage.getItem('token'));
        if(token && !config.isPublicRequest) baseApi.setBearerToken(token);
        return config;
    },
    function(error) {
      console.log(error);
       if (!error.response) {
            // network error
            this.errorStatus = 'Error: Network Error';
        } else {
            this.errorStatus = error.response.data.message;
        }
      return Promise.reject(error);
    }
);

export const axiosGet = async (url) => {
  const response = await baseApi.get(url);
  return response.data;
};

export const axiosPost = async (url, data) => await baseApi.post(url, data);

export default baseApi;
