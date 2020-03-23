import {
  checkCredentials,
  getPlayground,
  getMyPlayground,
  authoriseUser,
  handleLogOut,
  signUpUsers,
  addPlayground
} from '../lib/dataFetch.js';

export const authorise = payload => {
  return async dispatch => {
    const data = await authoriseUser();
    dispatch({
      type: 'HANDLE_LOGIN',
      payload: data
    });
  };
};
export const signUp = payload => {
  return async dispatch => {
    const data = await signUpUsers(payload);
    dispatch({
      type: 'HANDLE_SIGN',
      payload: data
    });
  };
};

export const handleLogin = payload => {
  return async dispatch => {
    const data = await checkCredentials(payload);
    dispatch({
      type: 'HANDLE_LOGIN',
      payload: data
    });
  };
};

export const logOut = payload => {
  return async dispatch => {
    // eslint-disable-next-line no-unused-vars
    const data = await handleLogOut();
    dispatch({
      type: 'HANDLE_LOGOUT',
      payload
    });
  };
};

export const playground = payload => {
  return async dispatch => {
    const data = await addPlayground(payload);
    dispatch({
      type: 'ADD_PLAYGROUND',
      payload: data
    });
  };
};

export const fetchPlayground = payload => {
  return async dispatch => {
    const data = await getPlayground();
    dispatch({
      type: 'FETCH_PLAYGROUND',
      payload: data
    });
  };
};

export const myPlayground = payload => {
  return async dispatch => {
    const data = await getMyPlayground();
    dispatch({
      type: 'MY_PLAYGROUND',
      payload: data
    });
  };
};
