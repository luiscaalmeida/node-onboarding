import axios from 'axios';

const baseApi = axios.create({});
baseApi.bearerToken = null;

baseApi.setBearerToken = function(token) {
    this.bearerToken = token;
    this.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

baseApi.interceptors.request.use(
    function (config) {
        const token = JSON.parse(localStorage.getItem('token'));
        if(token && !config.isPublicRequest) baseApi.setBearerToken(token);
        return config;
    },
    function(error) {
      console.log(error);
       if (!error.response) {
            this.errorStatus = 'Error: Network Error';
          } else {
            this.errorStatus = error.response.data.message;
        }
      return Promise.reject(error); 
    }
);

baseApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
          console.log("Caught a 401");
          window.location.href = "/logout";
        }
        return Promise.reject(error);
    }
);

export const axiosGet = async (url) => {
  try {
    const response = await baseApi.get(url);
    return response.data;
  }
  catch (err) {
    console.log("axiosGet error");
    return null;
  }
};

export const axiosPost = async (url, data) => await baseApi.post(url, data);

export default baseApi;
