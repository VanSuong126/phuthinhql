import axios from 'axios';
import {CommonActions} from '@react-navigation/native';

import {
  TIME_OUT,
  SUCCESS,
  SUCCESS_POST,
  NO_CONTENT,
  NOT_FOUND,
  INVALID_DATA,
} from '~constants';
import * as utils from '~helper/utils';
import LocalDB from '~data/asyncStorage';
import Navigation from '~navigator';
import {X_API_KEY} from '@env';

export const Axios = async (method, endpoint, params, enviroment = false) => {
  console.log('Call api Axios');

  let dataUser = await LocalDB.getUserData();
  let apiPath = dataUser?.ApiUrl;

  // let apiPath = `https://api.uat.phuckhanggem.com`;

  const authToken = dataUser?.Token;
  //enviroment để lẩy https://api.web4id.phuckhangnet.vn, để đồng bộ data (như các api user phải sử dụng chung môi trương để đồng bộ)
  if (!apiPath || enviroment === true) {
    apiPath = await LocalDB.getApiUrl();
  }
  const config = {timeout: TIME_OUT};
  let getQuery = (await (method === 'get' || method === 'delete'))
    ? '?' + utils.objectToQueryString(params)
    : '';
  console.log('[API Axios] : ' + method + ': ' + apiPath + endpoint);
  config.method = method;
  config.url = apiPath + endpoint + getQuery;

  if (method === 'post' || method === 'put' || method === 'delete') {
    config.data = await params;
    if (authToken) {
      config.headers = await {
        ...config.headers,
        Authorization: authToken ? `Bearer ${authToken}` : null,
        'x-api-key': X_API_KEY,
        'Content-Type': 'application/json',
      };
    } else {
      config.headers = await {
        ...config.headers,
        Cookie: null,
        'x-api-key': X_API_KEY,
        'Content-Type': 'application/json',
      };
      delete config.headers.Authorization;
    }
  } else {
    await delete config.data;
    if (authToken) {
      config.headers = await {
        ...config.headers,
        Authorization: authToken ? `Bearer ${authToken}` : null,
        'x-api-key': X_API_KEY,
      };
    } else {
      config.headers = await {
        ...config.headers,
        Cookie: null,
        'x-api-key': X_API_KEY,
      };
      delete config.headers.Authorization;
    }
  }

  // Custom header if is multipart/form-data
  if (params instanceof FormData) {
    config.headers = {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    };
  }
  console.log('config::here', config);
  return await axios(config)
    .then(res => {
      console.log(`Result api ${endpoint} ::: `, res);
      const status = res?.status;
      const dataResult = res?.data;
      const errorMessage = res?.data?.ErrorMessage;
      // data badge number for notification api
      const badge = res?.data?.total_read || 0;
      //SUCCESS PUT/GET/DELETE 200
      if (status == SUCCESS) {
        return Promise.resolve({
          success: true,
          error: null,
          data: dataResult,
          badge,
        });
      }
      //SUCCESS POST 201
      else if (status === SUCCESS_POST) {
        return Promise.resolve({
          success: true,
          error: errorMessage,
          data: dataResult,
        });
      }
      //ERROR 202
      else if (status === INVALID_DATA) {
        return Promise.resolve({
          success: false,
          error: errorMessage,
          data: null,
        });
      }
      //ERROR NO CONTENT 204
      else if (status === NO_CONTENT) {
        return Promise.resolve({
          success: false,
          error: errorMessage,
          data: null,
        });
      }
      //ERROR NOT FOUND 404
      else if (status === NOT_FOUND) {
        return Promise.resolve({
          success: false,
          error: errorMessage,
          data: null,
        });
      }
      // OTHER
      else {
        return Promise.resolve({
          success: false,
          error: errorMessage,
          data: null,
        });
      }
    })
    .catch(error => {
      console.log(
        `===================Error api : ${endpoint}====================`,
      );
      console.log(error?.message);
      console.log('===================END====================');
      let code = error?.code;
      //ERROR ECONNABORTED 408
      if (code === 'ECONNABORTED') {
        return Promise.resolve({
          success: false,
          error: {statusCodes: 408, message: error?.message},
        });
      }
      //ERROR ERR_BAD_REQUEST
      else if (code === 'ERR_BAD_REQUEST') {
        return Promise.resolve({
          success: false,
          error: {statusCodes: error?.status, message: error?.message},
        });
      } else {
        return Promise.resolve({
          success: false,
          error: error?.message,
        });
      }
    });
};

const onResetRoute = async () => {
  Navigation?.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'Home'}],
    }),
  );
};
