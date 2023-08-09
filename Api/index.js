import Axios from 'axios';
import EndPoints, {
  getPostList,
  getPostDetails,
  getAndPostComments,
  deleteComment,
} from './EndPoints';
import {getAuthToken} from './AxiosConfigure';

const callFormDataGetApi = async endPoint => {
  let token = getAuthToken();
  console.log('get token ==>> ', token);
  return Axios({
    url: endPoint,
    method: 'GET',
    headers: {Authorization: `Bearer ${token}`},
  }).then(parseResponse);
};

const callFormDataDeleteApi = async endPoint => {
  let token = getAuthToken();
  console.log('get token ==>> ', token);
  return Axios({
    url: endPoint,
    method: 'DELETE',
    headers: {Authorization: `Bearer ${token}`},
  }).then(parseResponse);
};

const callFormDataPostApi = async (endPoint, params, signal = undefined) => {
  let token = getAuthToken();
  console.log('Acess Token ', token);
  return Axios({
    url: endPoint,
    data: params,
    signal: signal,
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`},
  }).then(parseResponse);
};

const callFormDataPutApi = async (endPoint, params) => {
  let token = getAuthToken();
  console.log('Acess Token ', token);
  return Axios({
    url: endPoint,
    data: params,
    method: 'PUT',
    headers: {Authorization: `Bearer ${token}`},
  }).then(parseResponse);
};

const parseResponse = res => {
  if (!res || (!res.status && (!res.response || !res.response.status))) {
    return {response: 1, data: []};
  }
  return res.data;
};

const Api = {
  Auth: {
    login: param => callFormDataPostApi(EndPoints.login, param),
  },
  App: {
    getPostList: (limit = 10, offset = 0) =>
      callFormDataGetApi(getPostList(limit, offset)),
    getPostDetails: slug => callFormDataGetApi(getPostDetails(slug)),
    getComments: slug => callFormDataGetApi(getAndPostComments(slug)),
    postComment: (slug, param) =>
      callFormDataPostApi(getAndPostComments(slug), param),
    deleteComment: (slug, id) => callFormDataDeleteApi(deleteComment(slug, id)),
  },
};
export default Api;
