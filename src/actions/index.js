import {
  checkCredentials,
  getAllUsers,
  getPlayground,
  getMyPlayground,
  authoriseUser,
  handleLogOut,
  signUpUsers,

  //  playground 

  addPlayground,
  addProfileImage,
  getProfileImage,
  deleteProfileImage,
  deletePlayground,
  updatePlayground,

  // events 

  addEvents,
  getEventsList,
  getMyEvents,
  updateEvents,
  deleteEvents,

  // comment

  addComment,
  getcomment,
  getwriterImage,
  getWriterInfo,
  deleteComment,

  // group

  publicGroup,
  groupUrlPage,
  groupNews,
  addGroup,
  getGroupNews,
  getGroupMembers,
  addGroupEvents,
  getGroupEvent,
  updateGroupEvents,
  deleteGroupEvents,
  groupChats
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
export const allUser = (payload) => {
  return async (dispatch) => {
    const data = await getAllUsers();
    dispatch({
      type: "HANDLE_ALL_USERS",
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

export const writerImage = (payload) => {
  return async (dispatch) => {
    const data = await getwriterImage(payload);
    dispatch({
      type: "GET_WRITER_IMAGE",
      payload: data,
    });
  };
};

export const writerInfomation = (payload) => {
  return async (dispatch) => {
    const data = await getWriterInfo(payload);
    dispatch({
      type: "GET_WRITER_INFO",
      payload: data,
    });
  };
};

export const deleteCommenter = (payload) => {
  return async (dispatch) => {
    const data = await deleteComment(payload);
    dispatch({
      type: "DELETE_COMMENT",
      payload: data,
    });
  };
};

/**********************************************************
 ************************ Groups **************************
 ***********************************************************/
export const addNewsGroup = (payload) => {
  return async (dispatch) =>{
    const data = await addGroup(payload);
    dispatch({
      type: "ADD_GROUPS",
      payload: data
    })
  }
}
 export const publicGroups = (payload) => {
   return async (dispatch) =>{
     const data = await publicGroup();
     dispatch({
       type: "PUBLIC_GROUPS",
       payload: data
     })
   }
 }

export const urlGroupPage = (payload) => {
  return async (dispatch) =>{
    const data = await groupUrlPage(payload)
    dispatch({
      type: "URL_GROUPS_BY_ID",
      payload: data
    })
  }
}
export const postNewsGroup = (payload) => {
  return async (dispatch) =>{
    const data = await groupNews(payload)
    dispatch({
      type: "POST_GROUP_NEWS",
      payload: data
    })
  }
}
export const getAllGroupNews = (payload) => {
  return async (dispatch) =>{
    const data = await getGroupNews(payload)
    dispatch({
      type: "GET_GROUP_NEWS",
      payload: data
    })
  }
}

export const getAllGroupMembers = (payload) => {
  return async (dispatch) =>{
    const data = await getGroupMembers(payload)
    dispatch({
      type: "GET_GROUP_MEMBERS",
      payload: data
    })
  }
}

export const postGroupEvent = (payload) => {
  return async (dispatch) =>{
    const data = await addGroupEvents(payload)
    dispatch({
      type: "POST_GROUP_EVENTS",
      payload: data
    })
  }
}

export const getAllGroupevents = (payload) => {
  return async (dispatch) =>{
    const data = await getGroupEvent(payload)
    dispatch({
      type: "GET_GROUP_EVENTS",
      payload: data
    })
  }
}
export const updateGroupevents = (payload,id) => {
  return async (dispatch) =>{
    const data = await updateGroupEvents(payload,id)
    dispatch({
      type: "UPDATE_GROUP_EVENTS",
      payload: data
    })
  }
}

export const deleteGroupEvent = (payload) => {
  return async (dispatch) => {
    const data = await deleteGroupEvents(payload);
    dispatch({
      type: "DELETE_GROUP_EVENT",
      payload: data,
    });
  };
};

export const getGroupChats = (payload,skip,limit) => {
  return async (dispatch) => {
    const data = await groupChats(payload,skip,limit);
    dispatch({
      type: "GET_GROUP_CHATS",
      payload: data,
    });
  };
};