/**
 * Created by Peter Hoang Nguyen on 4/5/2017.
 */
import Store from 'reducers/StoreInitializer';

class CommonURL {

  options = () => {
    let userInfo = Store.getState().user.info || {};
    return {
      _sand_ajax: 1,
      _sand_platform: 1,
      submit: 1,
      _sand_token: (userInfo) ? userInfo.token : '',
      _sand_uiid: (userInfo) ? userInfo.iid : ''
    }
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
    console.log("Store", Store.getState());
    params = params || {};
    if (params.hasOwnProperty('domainUrl') || params.hasOwnProperty('domain-url')) {
      url = params['domainUrl'] + url.startsWith("/") ? url : "/" + url;
      delete params['domainUrl']
    } else if (!url.startsWith("http") && !url.startsWith("https")) {
      url = process.env.REACT_APP_SERVER_API_URL + (url.startsWith("/") ? url : "/" + url);
    }
    params = Object.assign({}, params, this.options());

    if (!headers) {
      headers = {};
    }

    var myHeaders = new Headers();
    for (var key in headers) {
      myHeaders.append(key, headers[key]);
    }
    return {
      urlProcess: url,
      allParams: params,
      headersData: myHeaders
    };
  }

  createFrom(params, form) {
    if (!form) {
      form = new FormData();
    }
    if (!params) {
      return form;
    }
    for (let key in params) {
      this.simplifyParams(form, key, params[key]);
    }
    return form;
  }

  simplifyParams(form, key, param) {
    if (!Array.isArray(param)) {
      form.append(key, param);
      return form;
    }

    param.forEach((subData) => {
      let newKey = key + "[]";
      if (Array.isArray(subData)) {
        this.simplifyParams(form, newKey, subData);
      } else {
        form.append(newKey, subData);
      }
    })
  }
}

export default new CommonURL();