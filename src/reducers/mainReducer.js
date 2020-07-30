import { publicGroup } from "../lib/dataFetch";

const initialState = {
  // Log and Sign and user Info
  loading: true,
  allUserInfo: [],
  isLoggedIn: false,
  sign: false,
  info: {},
  // user Image
  proImage: [],
  valideImg: false,
  ImageIsDelete: false,
  // playground
  addplay: false,
  personalPlayground: [],
  playground: [],
  playIsDelete: false,
  playIsUpdate: false,
  // events
  addEvents: false,
  eventsList: [],
  personalEvents: [],
  eventIsUpdate: false,
  eventIsDelete: false,
  // COMMENT
  addComment: false,
  getComment: false,
  allComment: [],
  writerImg: [],
  writerInfo:[],
  commentIsDelete: false,
  // Groups
  addGroup: false,
  allPublicGroup : [],
  urlGroupInfo: [],
  addNewsGroup : [],
  GroupNews: [],
  groupMembers: [],
  addGroupEvent: false,
  groupEvents: [],
  groupEventIsUpdate: false,
  GroupEventIsDelete: false,
  groupChats : [],
  groupChatsData : []
};

const mainReducer = (state = initialState, action) => {
  /**********************************************************
   ********************* USER LOGIN & SIGN-UP ***************
   ***********************************************************/

  if (action.type === "HANDLE_USER") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.isLoggedIn = false;
    } else {
      state.isLoggedIn = true;
      state.sign = true;
      state.addGroup = false;
      state.info = action.payload;
    }
    state.loading = false;

    return Object.assign({}, state);
  }
  if(action.type === "HANDLE_ALL_USERS"){
    state.allUserInfo = action.payload;
    return Object.assign({}, state);
  }
  if (action.type === "HANDLE_LOGIN") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.isLoggedIn = false;
    } else {
      state.isLoggedIn = true;
      state.sign = true;
      state.info = action.payload;
    }
    state.loading = false;
    return Object.assign({}, state);
  }

  if (action.type === "HANDLE_SIGN") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.sign = false;
      state.isLoggedIn = false;
    } else {
      state.sign = true;
      state.isLoggedIn = true;
      state.info = action.payload;
    }
    state.loading = false;
    return Object.assign({}, state);
  }
  if (action.type === "HANDLE_LOGOUT") {
    state.isLoggedIn = false;
    state.sign = false;
    state.info= []
    return Object.assign({}, state);
  }
  /**********************************************************
   ************************ Profile iMAGES ***********************
   ***********************************************************/
  if (action.type === "ADD_PROFILE_IMAGE") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.valideImg = false;
    } else {
      state.valideImg = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "GET_PROFILE_IMAGE") {
    for (let proImage of Object.keys(action.payload)) {
      state.proImage = [action.payload[proImage]];
    }
    return Object.assign({}, state);
  }

  if (action.type === "DELETE_PROFILE_IMAGE") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.ImageIsDelete = false;
    } else {
      state.ImageIsDelete = true;
    }
    return Object.assign({}, state);
  }

  /**********************************************************
   ************************ PLAYGROUND ***********************
   ***********************************************************/
  if (action.type === "FETCH_PLAYGROUND") {
    state.playground = action.payload;
    return Object.assign({}, state);
  }
  if (action.type === "ADD_PLAYGROUND") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.addplay = false;
    } else {
      state.addplay = true;
    }
    state.loading = false;
    return Object.assign({}, state);
  }
  if (action.type === "MY_PLAYGROUND") {
    state.personalPlayground = action.payload;
    state.playIsDelete = false;
    state.playIsUpdate = false;
    state.addplay = false;
    return Object.assign({}, state);
  }
  if (action.type === "DELETE_PLAYGROUND") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.playIsDelete = false;
    } else {
      state.playIsDelete = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "UPDATE_PLAYGROUND") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.playIsUpdate = false;
    } else {
      state.playIsUpdate = true;
    }
    return Object.assign({}, state);
  }
  /**********************************************************
   ************************ events ****************************
   ***********************************************************/
  if (action.type === "ADD_EVENTS") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.addEvents = false;
    } else {
      state.addEvents = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "FETCH_EVENTS") {
    state.eventsList = action.payload;
    return Object.assign({}, state);
  }
  if (action.type === "MY_EVENTS") {
    state.personalEvents = action.payload;
    state.eventIsUpdate = false;
    state.eventIsDelete = false;
    state.addEvents = false;
    return Object.assign({}, state);
  }
  if (action.type === "UPDATE_EVENT") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.eventIsUpdate = false;
    } else {
      state.eventIsUpdate = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "DELETE_EVENT") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.eventIsDelete = false;
    } else {
      state.eventIsDelete = true;
    }
    return Object.assign({}, state);
  }
  /**********************************************************
   ************************ comment ****************************
   ***********************************************************/
  if (action.type === "ADD_COMMENT") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.addComment = false;
    } else {
      state.addComment = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "FETCH_COMMENT") {
    state.allComment = action.payload;
    state.addComment= false
    state.commentIsDelete = false;
    return Object.assign({}, state);
  }
  if (action.type === "GET_WRITER_IMAGE") {
    state.writerImg = action.payload;
    return Object.assign({}, state);
  }
  if (action.type === "GET_WRITER_INFO") {
    state.writerInfo = action.payload;
    return Object.assign({}, state);
  }
  if (action.type === "DELETE_COMMENT") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.commentIsDelete = false;
    } else {
      state.commentIsDelete = true;
    }
    return Object.assign({}, state);
  }
    /**********************************************************
   ************************ comment ****************************
   ***********************************************************/
  if (action.type === "ADD_GROUPS") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.addGroup = false;
    } else {
      state.addGroup = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "PUBLIC_GROUPS") {
    state.allPublicGroup = action.payload;
    return Object.assign({}, state);
  } 
  if (action.type === "URL_GROUPS_BY_ID") {
    if (action.payload.hasOwnProperty("error") ||
    action.payload.hasOwnProperty("errors") ||
    action.payload.hasOwnProperty("length")) {
      state.urlGroupInfo= false
    } else {
      state.urlGroupInfo = action.payload;
    }
    return Object.assign({}, state);
  }
  if (action.type === "POST_GROUP_NEWS") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.addNewsGroup = false;
    } else {
      state.addNewsGroup =  action.payload;
    }
    return Object.assign({}, state);
  }
  if (action.type === "GET_GROUP_NEWS") {
    state.GroupNews =  action.payload;
    state.addNewsGroup = false;
    return Object.assign({}, state);
  }
  if (action.type === "GET_GROUP_MEMBERS") {
    state.groupMembers =  action.payload;
    return Object.assign({}, state);
  }
  if (action.type === "POST_GROUP_EVENTS") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.addGroupEvent = false;
    } else {
      state.addGroupEvent = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "GET_GROUP_EVENTS") {
    state.groupEvents=  action.payload;
    state.addGroupEvent = false;
    state.groupEventIsUpdate = false;
    state.GroupEventIsDelete = false;
    return Object.assign({}, state);
  }
  if (action.type === "UPDATE_GROUP_EVENTS") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.groupEventIsUpdate = false;
    } else {
      state.groupEventIsUpdate = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "DELETE_GROUP_EVENT") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.GroupEventIsDelete = false;
    } else {
      state.GroupEventIsDelete = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "GET_GROUP_CHATS") {
    // if (action.payload.meta.skip !== 0) {
    //   state.groupChats=([...state.groupChats, ...action.payload.chats]);
    //   state.groupChatsData = action.payload.meta
    // }else{
      state.groupChats=action.payload.chats;
      state.groupChatsData = action.payload.meta
    // }
    
    return Object.assign({}, state);
  }
  return state;
};

export default mainReducer;
