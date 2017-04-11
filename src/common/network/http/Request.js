/**
 * Created by Peter Hoang Nguyen on 4/2/2017.
 */
import axios from 'axios';
import commonURL from '../CommonURL';

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
        let {urlProcess, allParams} = commonURL.getURL(url, params);

        return axios.get(urlProcess, {
            params: allParams
        }).then(response => response.data);
    }

    post(url, params) {
        let {urlProcess, allParams, attachments} = commonURL.getURL(url, params);

        var formPost = new FormData();
        for (let key in allParams) {
            formPost.append(key, allParams[key]);
        }

        for (let key in attachments) {
            let data = attachments[key];
            if(Array.isArray(data)) {
                data.forEach((subData, subKey) => {
                    formPost.append(key + "[]", subData);
                })
            } else {
                formPost.append(key, data);
            }
        }

        return axios.post(urlProcess, formPost).then(response => response.data);
    }
}

export default new Request();
