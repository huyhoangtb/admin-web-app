/**
 * Created by Peter Hoang Nguyen on 4/5/2017.
 */


class CommonURL {
    options = {
        _sand_ajax: 1,
        _sand_platform: 1,
        submit: 1
    }

    appendObjectToURL(url, params) {
        if (!params) {
            return url;
        }

        let urlObj = new URL(url);
        Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]))
        return urlObj;
    }

    getURL(url, params, headers) {
        params = params || {};
        if (params.hasOwnProperty('domainUrl') || params.hasOwnProperty('domain-url')) {
            url = params['domainUrl'] + url.startsWith("/") ? url : "/" + url;
            delete params['domainUrl']
        } else if (!url.startsWith("http") && !url.startsWith("https")) {
            url = process.env.REACT_APP_SERVER_API_URL + (url.startsWith("/") ? url : "/" + url);
        }
        params = Object.assign({}, params, this.options);

        let userInfor = localStorage.getItem(process.env.REACT_APP_USER_LOCAL_STORAGE_KEY);
        if (userInfor && userInfor !== undefined && userInfor !== "undefined") {
            userInfor = JSON.parse(userInfor);
            if (userInfor.token && userInfor.iid) {
                params = Object.assign({}, params, {
                    _sand_token: userInfor.token || '',
                    _sand_uiid: userInfor.iid || '',
                });
            }
        }
        let attachmentsDetected = [];
        if(params.hasOwnProperty('attachments') && params['attachments']) {
            attachmentsDetected = params['attachments'];
            delete params['attachments'];
        }

        if (!headers) {
            headers = {};
        }

        headers = Object.assign({}, {
            // 'Content-Type': 'application/json'
        }, headers)

        var myHeaders = new Headers();
        for (var key in headers) {
            myHeaders.append(key, headers[key]);
        }
        return {
            urlProcess: url,
            allParams: params,
            headersData: myHeaders,
            attachments: attachmentsDetected
        };
    }
}

let commonURL = new CommonURL();
export default commonURL;