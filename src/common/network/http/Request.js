/**
 * Created by Peter Hoang Nguyen on 4/2/2017.
 */
import axios from 'axios';
import common from './Common';

axios.interceptors.request.use(function (config) {
  // console.log("before request: success", config);
  return config;
}, function (error) {
  // console.log("before request: not success");
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log("response: success");
  return response;
}, function (error) {
  // Do something with response error
  // console.log("response: not success");
  return Promise.reject(error);
});

class Request {


  get(url, params) {
    let {urlProcess, allParams} = common.getURL(url, params);

    return axios.get(urlProcess, {
      params: allParams
    }).then(response => response.data);
  }

  post(url, params) {
    let {urlProcess, allParams} = common.getURL(url, params);
    let formPost = common.createFrom(allParams);

    return axios.post(urlProcess, formPost).then(response => response.data);
  }
}

export default new Request();
