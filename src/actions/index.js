import {
  checkCredentials,
  getPlayground,
  getMyPlayground,
  authoriseUser,
  handleLogOut,
  signUpUsers,
  addPlayground,
  addProfileImage,
  getProfileImage,
  deleteProfileImage,
  deletePlayground,
  updatePlayground,
  addEvents,
  getEventsList,
  getMyEvents,
  updateEvents,
  deleteEvents,
  addComment,
  getcomment
} from "../lib/dataFetch.js";

export const authorise = (payload) => {
  return async (dispatch) => {
    const data = await authoriseUser();
    dispatch({
      type: "HANDLE_USER",
      payload: data,
    });
  };
};
export const signUp = (payload) => {
  return async (dispatch) => {
    const data = await signUpUsers(payload);
    dispatch({
      type: "HANDLE_SIGN",
      payload: data,
    });
  };
};

export const handleLogin = (payload) => {
  return async (dispatch) => {
    const data = await checkCredentials(payload);
    dispatch({
      type: "HANDLE_LOGIN",
      payload: data,
    });
  };
};

export const profileImage = (payload) => {
  return async (dispatch) => {
    const data = await addProfileImage(payload);
    dispatch({
      type: "ADD_PROFILE_IMAGE",
      payload: data,
    });
  };
};
export const allMyImage = (payload) => {
  return async (dispatch) => {
    const data = await getProfileImage(payload);
    dispatch({
      type: "GET_PROFILE_IMAGE",
      payload: data,
    });
  };
};

export const logOut = (payload) => {
  return async (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const data = await handleLogOut();
    dispatch({
      type: "HANDLE_LOGOUT",
      payload,
    });
  };
};

export const playground = (payload) => {
  return async (dispatch) => {
    const data = await addPlayground(payload);
    dispatch({
      type: "ADD_PLAYGROUND",
      payload: data,
    });
  };
};

export const fetchPlayground = (payload) => {
  return async (dispatch) => {
    const data = await getPlayground();
    dispatch({
      type: "FETCH_PLAYGROUND",
      payload: data,
    });
  };
};

export const myPlayground = (payload) => {
  return async (dispatch) => {
    const data = await getMyPlayground();
    dispatch({
      type: "MY_PLAYGROUND",
      payload: data,
    });
  };
};

export const deleteImage = (payload) => {
  return async (dispatch) => {
    const data = await deleteProfileImage(payload);
    dispatch({
      type: "DELETE_PROFILE_IMAGE",
      payload: data,
    });
  };
};

export const deletePlay = (payload) => {
  return async (dispatch) => {
    const data = await deletePlayground(payload);
    dispatch({
      type: "DELETE_PLAYGROUND",
      payload: data,
    });
  };
};
export const updatePlay = (payload, id) => {
  return async (dispatch) => {
    const data = await updatePlayground(payload, id);
    dispatch({
      type: "UPDATE_PLAYGROUND",
      payload: data,
    });
  };
};

/**********************************************************
 ************************ events **************************
 ***********************************************************/

export const events = (payload) => {
  return async (dispatch) => {
    const data = await addEvents(payload);
    dispatch({
      type: "ADD_EVENTS",
      payload: data,
    });
  };
};
export const fetcheventsList = (payload) => {
  return async (dispatch) => {
    const data = await getEventsList();
    dispatch({
      type: "FETCH_EVENTS",
      payload: data,
    });
  };
};
export const myEvents = (payload) => {
  return async (dispatch) => {
    const data = await getMyEvents();
    dispatch({
      type: "MY_EVENTS",
      payload: data,
    });
  };
};

export const updateEvent = (payload, id) => {
  return async (dispatch) => {
    const data = await updateEvents(payload, id);
    dispatch({
      type: "UPDATE_EVENT",
      payload: data,
    });
  };
};

export const deleteEvent = (payload) => {
  return async (dispatch) => {
    const data = await deleteEvents(payload);
    dispatch({
      type: "DELETE_EVENT",
      payload: data,
    });
  };
};
/**********************************************************
 ************************ comment **************************
 ***********************************************************/

export const commentAdd = (payload) => {
  return async (dispatch) => {
    const data = await addComment(payload);
    dispatch({
      type: "ADD_COMMENT",
      payload: data,
    });
  };
};

export const fetchComment= (payload) => {
  return async (dispatch) => {
    const data = await getcomment(payload);
    dispatch({
      type: "FETCH_COMMENT",
      payload: data,
    });
  };
};