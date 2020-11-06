import {
  checkCredentials,
  getAllUsers,
  getPlayground,
  getMyPlayground,
  authoriseUser,
  handleLogOut,
  signUpUsers,
  getOneUser,
  password,
  validateResetToken,
  resetPassword,

  // friend

  friendReq,
  friendReqAccepte,
  friendReqRefuse,
  removeOneFriend,

  //  playground 

  getOnePlayground,
  addPlayground,
  addProfileImage,
  getProfileImage,
  deleteProfileImage,
  deletePlayground,
  updatePlayground,
  likeOnePlayground,
  unLikeOnePlayground,
  getPlaygroundPagination,

  // events 

  addEvents,
  getEventsList,
  getMyEvents,
  updateEvents,
  deleteEvents,
  getOneEvent,
  eventParticipation,
  // comment

  addComment,
  getcomment,
  deleteComment,

  // group

  publicGroup,
  groupUrlPage,
  groupNews,
  addGroup,
  getGroupNews,
  deleteGroupNews,
  getGroupMembers,
  addGroupEvents,
  getGroupEvent,
  updateGroupEvents,
  deleteGroupEvents,
  groupChats,
  addNewAdmin,
  removeAdmin,
  removeMembers,
  joinGroupRequest,
  joinAccpet,
  joinRefused,
  updateGroupInfo,
  updateGroupPicture,

  // articles

  addNewArticle,
  getOneArticles,
  getArticlesCityOrTitle,
  getArticleTitle,
  getUserArticles,
  updateArticles,
  SaveArticles,
  deleteArticles,

  // message

  getChatMembers,
  getMyMessage,
  readMyMsg,
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
export const OneUser = (payload) => {
  return async (dispatch) => {
    const data = await getOneUser(payload);
    dispatch({
      type: "GET_ONE_USERS",
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
export const deleteImage = (payload) => {
  return async (dispatch) => {
    const data = await deleteProfileImage(payload);
    dispatch({
      type: "DELETE_PROFILE_IMAGE",
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
export const passwordForgot = (payload) => {
  return async (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const data = await password(payload);
    dispatch({
      type: "PASSWORD_FORGOT",
      payload: data
    });
  };
};

export const validateToken = (payload) => {
  return async (dispatch) => {
    const data = await validateResetToken(payload);
    dispatch({
      type: "TOKEN_VALIDATION",
      payload: data
    });
  };
};

export const passwordReset = (payload) => {
  return async (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const data = await resetPassword(payload);
    dispatch({
      type: "PASSWORD_RESET",
      payload: data
    });
  };
};
/**********************************************************
 ************************ friend **************************
 ***********************************************************/
export const userFriendreq = (payload) => {
  return async (dispatch) => {
    const data = await friendReq(payload);
    dispatch({
      type: "FRIEND_REQUEST",
      payload: data,
    });
  };
};
export const accepteFriend= (payload) => {
  return async (dispatch) => {
    const data = await friendReqAccepte(payload);
    dispatch({
      type: "FRIEND_REQUEST_ACCEPTE",
      payload: data,
    });
  };
};
export const refuseFriend= (payload) => {
  return async (dispatch) => {
    const data = await friendReqRefuse(payload);
    dispatch({
      type: "FRIEND_REQUEST_REFUSE",
      payload: data,
    });
  };
};
export const removeFriend= (payload) => {
  return async (dispatch) => {
    const data = await removeOneFriend(payload);
    dispatch({
      type: "REMOVE_FRIEND",
      payload: data,
    });
  };
};

/**********************************************************
 ************************ PLAYGROUN **************************
 ***********************************************************/

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
    const data = await getPlayground(payload);
    dispatch({
      type: "FETCH_PLAYGROUND",
      payload: data,
    });
  };
};
export const fetchPlaygroundPagination = (skip,location) => {
  return async (dispatch) => {
    const data = await getPlaygroundPagination(skip,location);
    dispatch({
      type: "FETCH_PLAYGROUND",
      payload: data,
    });
  };
};
export const fetchOnePlayground = (payload) => {
  return async (dispatch) => {
    const data = await getOnePlayground(payload);
    dispatch({
      type: "FETCH_ONE_PLAYGROUND",
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
export const LikePlayground = (payload) => {
  return async (dispatch) => {
    const data = await likeOnePlayground(payload);
    dispatch({
      type: "LIKE_PLAYGROUND",
      payload: data,
    });
  };
};
export const unLikePlayground = (payload) => {
  return async (dispatch) => {
    const data = await unLikeOnePlayground(payload);
    dispatch({
      type: "UNLIKE_PLAYGROUND",
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

export const fetchOneEvents = (payload) => {
  return async (dispatch) => {
    const data = await getOneEvent(payload);
    dispatch({
      type: "GET_ONE_EVENTS",
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
export const handleEventParticipation = (payload) => {
  return async (dispatch) => {
    const data = await eventParticipation(payload);
    dispatch({
      type: "JOIN_EVENT",
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
export const deleteNews = (payload) => {
  return async (dispatch) =>{
    const data = await deleteGroupNews(payload)
    dispatch({
      type: "DELETE_GROUP_NEWS",
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

export const addToAdmin = (payload,id) => {
  return async (dispatch) => {
    const data = await addNewAdmin(payload,id,);
    dispatch({
      type: "ADD_TO_ADMIN",
      payload: data,
    });
  };
};
export const removeToAdmin = (payload,id) => {
  return async (dispatch) => {
    const data = await removeAdmin(payload,id,);
    dispatch({
      type: "REMOVE_TO_ADMIN",
      payload: data,
    });
  };
};

export const removeMember= (payload,id) => {
  return async (dispatch) => {
    const data = await removeMembers(payload,id,);
    dispatch({
      type: "REMOVE_GROUP_MEMBERS",
      payload: data,
    });
  };
};

export const joinGroupReq= (payload,id) => {
  return async (dispatch) => {
    const data = await joinGroupRequest(payload,id,);
    dispatch({
      type: "JOIN_GROUP_REQ",
      payload: data,
    });
  };
};
export const joinGroupAccpet= (payload,user,admin) => {
  return async (dispatch) => {
    const data = await joinAccpet(payload,user,admin);
    dispatch({
      type: "JOIN_GROUP_ACCPET",
      payload: data,
    });
  };
};
export const joinGroupRefused= (payload,user,admin) => {
  return async (dispatch) => {
    const data = await joinRefused(payload,user,admin);
    dispatch({
      type: "JOIN_GROUP_REFUSED",
      payload: data,
    });
  };
};
export const updateGroupInformation= (payload,info) => {
  return async (dispatch) => {
    const data = await updateGroupInfo(payload,info);
    dispatch({
      type: "UPDATE_GROUP_INFO",
      payload: data,
    });
  };
};

export const updateGroupPhoto= (payload,info) => {
  return async (dispatch) => {
    const data = await updateGroupPicture(payload,info);
    dispatch({
      type: "UPDATE_GROUP_PICTURE",
      payload: data,
    });
  };
};

/**********************************************************
 ************************ articles **************************
 ***********************************************************/

 export const newArticle = (payload)=>{
   return async (dispatch)=>{
     const data = await addNewArticle(payload);
     dispatch({
       type: "NEW_ARTICLES",
       payload: data
     })
   }
 }
 export const updateOneArticle = (payload,id)=>{
  return async (dispatch)=>{
    const data = await updateArticles(payload,id);
    dispatch({
      type: "UPDATE_ARTICLES",
      payload: data
    })
  }
}

 export const oneArticle = (payload) =>{
    return async (dispatch)=>{
      const data = await getOneArticles(payload);
      dispatch({
        type: "ONE_ARTICLES",
        payload: data
      })
    }
 }

 export const ArticleCityAndTitle = (city,title,option,distance,currentPage) =>{
  return async (dispatch)=>{
    const data = await getArticlesCityOrTitle(city,title,option,distance,currentPage);
    dispatch({
      type: "ALL_ARTICLES_CITY_OR_TITLE",
      payload: data
    })
  }
}
export const matchTitle = (title) =>{
  return async (dispatch)=>{
    const data = await getArticleTitle(title);
    dispatch({
      type: "MACTH_ARTICLE_BY_TITLE",
      payload: data
    })
  }
}

export const UserArticles = (id)=>{
  return async (dispatch)=>{
    const data = await getUserArticles(id);
    dispatch({
      type: "GET_USER_ARTICLES",
      payload: data
    })
  }
}

export const saveOneArticles = (id)=>{
  return async (dispatch)=>{
    const data = await SaveArticles(id);
    dispatch({
      type: "SAVE_ARTICLES",
      payload: data
    })
  }
}

export const deleteOneArticles = (id)=>{
  return async (dispatch)=>{
    const data = await deleteArticles(id);
    dispatch({
      type: "DELETE_ARTICLES",
      payload: data
    })
  }
}

/**********************************************************
 ************************ messager **************************
 ***********************************************************/
export const myMessages = (id,id2)=>{
  return async (dispatch)=>{
    const data = await getMyMessage(id,id2);
    dispatch({
      type: "GET_MESSAGE",
      payload: data
    })
  }
}
export const chatMembers = (id)=>{
  return async (dispatch)=>{
    const data = await getChatMembers(id);
    dispatch({
      type: "USERS_MESSAGE",
      payload: data
    })
  }
}



export const refre = (data)=>{
  return async (dispatch)=>{
    dispatch({
      type: "REFREC_MESSAGE",
      payload: data
    })
  }
}


export const readMsg = (id)=>{
  return async (dispatch)=>{
    const data = await readMyMsg(id);
    dispatch({
      type: "READ_MESSAGE",
      payload: data
    })
  }
}