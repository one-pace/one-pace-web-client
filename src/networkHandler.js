/* eslint-disable no-param-reassign */

import Axios from 'axios';

export default class NetworkHandler {
  static request(route, data, onSuccess, onError, onUploadProgress) {
    onSuccess = onSuccess == null ? (f) => f : onSuccess;
    onError = onError == null ? (f) => f : onError;
    Axios.request({
      method: 'POST',
      url: `https://api.onepace.net/${route}`,
      data,
      responseType: 'json',
      onUploadProgress,
    })
      .then((response) => {
        const responseObject = {
          ...response.data,
          status: response.status,
          message: response.statusText,
        };
        if (response.status === 200) {
          onSuccess(responseObject);
        } else {
          onError(responseObject);
        }
      })
      .catch((error) => {
        onError({
          status: 500,
          message: error.message,
        });
      });
  }
}
