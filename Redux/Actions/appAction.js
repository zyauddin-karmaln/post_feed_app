import {Alert} from 'react-native';
import Api from '../../Api';
import {setAuthToken} from '../../Api/AxiosConfigure';
import {setToken, setUser} from '../../Utility/storage.js';
import {
  LOGIN_ACTION,
  UPDATE_AUTH_TOKEN,
  UPDATE_POST_LIST,
  UPDATE_POST_DETAILS,
  UPDATE_POST_PAGE,
  SHOW_LOADER,
  HIDE_LOADER,
  RESET_ACTION,
  UPDATE_POST_COMMENTS,
  DELETE_POST_COMMENT,
  ADD_POST_COMMENT,
} from '../Constants/types';
import Toast from 'react-native-simple-toast';
import screens from '../../Utility';

export const showLoader = (screen = '') => {
  return {
    type: SHOW_LOADER,
    payload: screen,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
    payload: '',
  };
};

export const updateToken = token => {
  return {
    type: UPDATE_AUTH_TOKEN,
    payload: token,
  };
};

export const updatePostPage = page => {
  return {
    type: UPDATE_POST_PAGE,
    payload: page,
  };
};

export const updatePostList = list => {
  return {
    type: UPDATE_POST_LIST,
    payload: list,
  };
};

export const updatePostDetails = post => {
  return {
    type: UPDATE_POST_DETAILS,
    payload: post,
  };
};

export const updatePostComments = list => {
  return {
    type: UPDATE_POST_COMMENTS,
    payload: list,
  };
};

export const addPostComments = comment => {
  return {
    type: ADD_POST_COMMENT,
    payload: comment,
  };
};

export const deletePostComment = id => {
  return {
    type: DELETE_POST_COMMENT,
    payload: id,
  };
};

export const updateUser = user => {
  return {
    type: LOGIN_ACTION,
    payload: user,
  };
};

export const resetData = () => {
  return {
    type: RESET_ACTION,
  };
};

export const loginAction =
  (params, callback = () => {}) =>
  async dispatch => {
    console.log('login params:- ', params);
    dispatch(showLoader(screens.auth));
    Api.Auth.login(params)
      .then(response => {
        dispatch(hideLoader());
        console.log('login response:- ', response);
        if (response?.user) {
          setAuthToken(response?.user?.token);
          setUser(response?.user);
          setToken(response?.user?.token);
          dispatch(updateToken(response?.user?.token));
          dispatch(updateUser(response?.user));
          Toast.show(
            response?.message ?? 'successfully logged in.',
            Toast.LONG,
            ['UIAlertController'],
          );
          callback();
        } else {
          console.log('login api failed:- ', response?.message);
          Alert.alert('Alert!', response?.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        console.log('error calling login api:- ', e);
        Alert.alert('Alert!', e.message);
      });
  };

export const getFeedPostListAction =
  (limit = 10, offset = 0, callback = () => {}) =>
  async dispatch => {
    dispatch(showLoader(screens.postList));
    console.log('get feed post list params:- ', limit, offset);
    Api.App.getPostList(limit, offset)
      .then(response => {
        dispatch(hideLoader());
        console.log('get feed post list api response:- ', response);
        if (
          Array.isArray(response?.articles) &&
          response?.articles?.length > 0
        ) {
          dispatch(updatePostList(response?.articles));
        } else {
          console.log('get feed post list api failed:- ', response?.message);
          Alert.alert('Alert!', response?.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        console.log('error calling get post list api:- ', e);
        Alert.alert('Alert!', e.message);
      });
  };

export const getFeedPostAction =
  (slug, callback = () => {}) =>
  async dispatch => {
    dispatch(showLoader(screens.post));
    console.log('get feed post params:- ', slug);
    Api.App.getPostDetails(slug)
      .then(response => {
        dispatch(hideLoader());
        console.log('get feed post api response:- ', response);
        if (response?.article) {
          dispatch(updatePostDetails(response?.article));
          callback();
        } else {
          console.log('get feed post api failed:- ', response?.message);
          Alert.alert('Alert!', response?.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        console.log('error calling get post api:- ', e);
        Alert.alert('Alert!', e.message);
      });
  };

export const getFeedPostCommentsAction = slug => async dispatch => {
  dispatch(showLoader(screens.post));
  console.log('get feed post comments params:- ', slug);
  Api.App.getComments(slug)
    .then(response => {
      dispatch(hideLoader());
      console.log('get feed post comments api response:- ', response);
      if (Array.isArray(response?.comments) && response?.comments?.length > 0) {
        dispatch(updatePostComments(response?.comments));
      } else {
        console.log('get feed post comments api failed:- ', response?.message);
        Alert.alert('Alert!', response?.message);
      }
    })
    .catch(e => {
      dispatch(hideLoader());
      console.log('error calling get post comments api:- ', e);
      Alert.alert('Alert!', e.message);
    });
};

export const deleteFeedPostCommentAction =
  (slug, id, callback = () => {}) =>
  async dispatch => {
    dispatch(showLoader(screens.post));
    console.log('delete feed post comments params:- ', slug, id);
    Api.App.deleteComment(slug, id)
      .then(response => {
        dispatch(hideLoader());
        console.log('delete feed post comments api response:- ', response);
        if (response) {
          dispatch(deletePostComment(id));
        } else {
          console.log(
            'delete feed post comment api failed:- ',
            response?.message,
          );
          Alert.alert('Alert!', response?.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        console.log('error calling delete post comment api:- ', e);
        Alert.alert('Alert!', e.message);
      });
  };

export const postComment =
  (slug, params, callback = () => {}) =>
  async dispatch => {
    console.log('post comment params:- ', slug, params);
    dispatch(showLoader(screens.post));
    Api.App.postComment(slug, params)
      .then(response => {
        dispatch(hideLoader());
        console.log('post comment response:- ', response);
        if (response?.comment) {
          dispatch(addPostComments(response?.comment));
          Toast.show(
            response?.message ?? 'comment successfully added.',
            Toast.LONG,
            ['UIAlertController'],
          );
          callback();
        } else {
          console.log('post comment api failed:- ', response?.message);
          Alert.alert('Alert!', response?.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        console.log('error calling post comment api:- ', e);
        Alert.alert('Alert!', e.message);
      });
  };
