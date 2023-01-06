import axios from 'axios';

const baseApi = axios.create({});
// const baseApi = axios.create({
//   headers: {
//     Authorization : `Bearer ${localStorage.getItem("token")}`
//   }
// });

// baseApi.bearerToken = null;

// baseApi.setBearerToken = function(token) {
//   console.log("setBearerToken: ", token);
//   this.bearerToken = token;
//   this.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   this.defaults.headers['Authorization'] = `Bearer ${token}`;
// };

// baseApi.interceptors.request.use(
//     function (config) {
//         const token = JSON.parse(localStorage.getItem('token'));
//         console.log("CONFIG");
//         console.log(config.isPublicRequest);
//         console.log(token);
//         if(token) {
//           console.log("entrei..");
//           baseApi.setBearerToken(token);
//         }
//         return config;
//     },
//     function(error) {
//       console.log("ERROR");
//       console.log(error);
//        if (!error.response) {
//             this.errorStatus = 'Error: Network Error';
//           } else {
//             this.errorStatus = error.response.data.message;
//         }
//       return Promise.reject(error); 
//     }
// );

baseApi.interceptors.request.use(
    function (config) {
        const token = JSON.parse(localStorage.getItem('token'));
        return token 
          ? {
            ...config,
            headers: {
              ...config.headers,
              'Authorization': `Bearer ${token}`
            }
          }
          : config;
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
