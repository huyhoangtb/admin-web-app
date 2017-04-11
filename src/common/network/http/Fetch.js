/**
 * Created by Peter Hoang Nguyen on 4/2/2017.
 */

import commonURL from '../CommonURL';

class FetchRequest {
     get(url, params, headers) {
        let {urlProcess, allParams, headersData} = commonURL.getURL(url, params, headers);
         return fetch(commonURL.appendObjectToURL(urlProcess, allParams), {
            method: 'GET',
            headers: headersData
        }).then(response => response)
    }

    post(url, params, headers) {
        let {urlProcess, allParams, headersData} = commonURL.getURL(url, params, headers);
        return fetch(urlProcess, {
            method: "POST",
            headers: headersData,
            body: JSON.stringify(allParams),
            mode: 'cors',
            cache: 'default'
        }).then(response => {
            return Promise.resolve(response)
        }).catch(err => {
            return Promise.reject(err)
        });;
    }


}

const fetchRequest = new FetchRequest();
export default fetchRequest;
