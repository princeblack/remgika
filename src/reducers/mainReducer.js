import { publicGroup } from "../lib/dataFetch";

const initialState = {
  // Log and Sign and user Info
  loading: true,
  allUserInfo: [],
  isLoggedIn: false,
  sign: false,
  info: {},
  getOneUser: {},
  // friend user
  friendReq: false,
  friendAccepted: false,
  friendRefuse : false,
  friendIsRemove: false ,
  // user Image
  proImage: [],
  valideImg: false,
  ImageIsDelete: false,
  // playground
  addplay: false,
  personalPlayground: [],
  playground: [],
  onePlayground: [],
  playIsDelete: false,
  playIsUpdate: false,
  playIsLike: false,
  // events
  addEvents: false,
  eventsList: [],
  personalEvents: [],
  eventIsUpdate: false,
  eventIsDelete: false,
  getOneEvent: [],
  joinEvent: false,
  // COMMENT
  addComment: false,
  getComment: false,
  allComment: [],
  writerImg: [],
  writerInfo: [],
  commentIsDelete: false,
  // Groups
  addGroup: false,
  allPublicGroup: [],
  urlGroupInfo: [],
  addNewsGroup: [],
  GroupNews: [],
  deleteGroupNew: false,
  groupMembers: [],
  addGroupEvent: false,
  groupEvents: [],
  groupEventIsUpdate: false,
  GroupEventIsDelete: false,
  groupChats: [],
  groupChatsData: [],
  addNewAdmin: false,
  removeAdmin: false,
  removeMembers: false,
  joinRequest: false,
  groupAccpteUser: false,
  groupRefusedUser: false,
  updateGroupInfo: false,
  updateGroupPIc: false,

  // articles
  articleIsAdd : false,
  newArticle: [],
  allArticles: [],
  allMatch : [],
  userArticle : [],
  oneArticleItme : [],
  articleIsUpdate : false,
  articleIssave : false,
  articleIsDelete : false,

  // message
  userMsg : {},
  myMsg : [],
  getRefrec: "",
  msgIsRead : false
};

const mainReducer =  (state = initialState, action) => {
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
      state.joinEvent = false;
      state.valideImg = false;
      state.info =  action.payload;
    }
    state.loading = false;

    return Object.assign({}, state);
  }
  if (action.type === "HANDLE_ALL_USERS") {
    state.allUserInfo = action.payload;
    return Object.assign({}, state);
  }
  if (action.type === "GET_ONE_USERS") {
    state.getOneUser = action.payload;
    state.friendReq= false;
    state.friendAccepted= false;
    state.friendRefuse= false;
    state.friendIsRemove= false;
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
      state.info =  action.payload;
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
    state.info = [];
    return Object.assign({}, state);
  }
   /**********************************************************
   ************************ friend ***********************
   ***********************************************************/
  if (action.type === "FRIEND_REQUEST") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.friendReq= false;
    } else {
      state.friendReq= true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "FRIEND_REQUEST_ACCEPTE") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.friendAccepted= false;
    } else {
      state.friendAccepted= true;
    }
    return Object.assign({}, state);
  }

  if (action.type === "FRIEND_REQUEST_REFUSE") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.friendRefuse= false;
    } else {
      state.friendRefuse= true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "REMOVE_FRIEND") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.friendIsRemove= false;
    } else {
      state.friendIsRemove= true;
    }
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
  if (action.type === "FETCH_ONE_PLAYGROUND") {
    // debugger
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.onePlayground = [];
    } else {
      state.onePlayground = action.payload;
      state.playIsLike = false;
      state.playIsUnLike = false;
    }
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
  if (action.type === "LIKE_PLAYGROUND") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.playIsLike = false;
    } else {
      state.playIsLike = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "UNLIKE_PLAYGROUND") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.playIsUnLike = false;
    } else {
      state.playIsUnLike = true;
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
  if (action.type === "GET_ONE_EVENTS") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.getOneEvent = [];
    } else {
      state.getOneEvent = action.payload;
      state.joinEvent = false;
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
  if (action.type === "JOIN_EVENT") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.joinEvent = false;
    } else {
      state.joinEvent = true;
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
      state.addComment = false;
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
   ************************ group ****************************
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
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.urlGroupInfo = [];
    } else {
      state.urlGroupInfo = action.payload;
      state.removeAdmin = false;
      state.addNewAdmin = false;
      state.removeMembers = false;
      state.joinRequest = false;
      state.groupAccpteUser = false;
      state.groupRefusedUser = false;
      state.updateGroupInfo = false;
      state.updateGroupPIc = false;
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
      state.addNewsGroup = action.payload;
    }
    return Object.assign({}, state);
  }
  if (action.type === "DELETE_GROUP_NEWS") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.deleteGroupNew = false;
    } else {
      state.deleteGroupNew = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "GET_GROUP_NEWS") {
    state.GroupNews = action.payload;
    state.addNewsGroup = false;
    state.deleteGroupNew = false;

    return Object.assign({}, state);
  }
  if (action.type === "GET_GROUP_MEMBERS") {
    state.groupMembers = action.payload;
    state.removeAdmin = false;
    state.addNewAdmin = false;
    state.removeMembers = false;
    state.joinRequest = false;
    state.groupAccpteUser = false;
    state.groupRefusedUser = false;
    state.updateGroupInfo = false;
    state.updateGroupPIc = false;
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
    state.groupEvents = action.payload;
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
    state.groupChats = action.payload.chats;
    state.groupChatsData = action.payload.meta;
    // }

    return Object.assign({}, state);
  }
  if (action.type === "ADD_TO_ADMIN") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.addNewAdmin = false;
    } else {
      state.addNewAdmin = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "REMOVE_TO_ADMIN") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.removeAdmin = false;
    } else {
      state.removeAdmin = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "REMOVE_GROUP_MEMBERS") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.removeMembers = false;
    } else {
      state.removeMembers = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "JOIN_GROUP_REQ") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.joinRequest = false;
    } else {
      state.joinRequest = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "JOIN_GROUP_ACCPET") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.groupAccpteUser = false;
    } else {
      state.groupAccpteUser = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "JOIN_GROUP_REFUSED") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.groupRefusedUser = false;
    } else {
      state.groupRefusedUser = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "UPDATE_GROUP_INFO") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.updateGroupInfo = false;
    } else {
      state.updateGroupInfo = true;
    }
    return Object.assign({}, state);
  }
  if (action.type === "UPDATE_GROUP_PICTURE") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.updateGroupPIc = false;
    } else {
      state.updateGroupPIc = true;
    }
    return Object.assign({}, state);
  }
   /**********************************************************
   ************************ Profile iMAGES ***********************
   ***********************************************************/
  if(action.type === "NEW_ARTICLES"){
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")||
      action.payload.hasOwnProperty("length")
    ) {
      state.newArticle = [];
      state.articleIsAdd = false;
    }else{
      state.newArticle = action.payload;
      state.articleIsAdd = true;
    }
    return Object.assign({}, state);
  }
  if(action.type === "UPDATE_ARTICLES"){
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")||
      action.payload.hasOwnProperty("length")
    ) {
      state.articleIsUpdate = false;
    }else{
      state.articleIsUpdate = true;
    }
    return Object.assign({}, state);
  }
  if(action.type === "SAVE_ARTICLES"){
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")||
      action.payload.hasOwnProperty("length")
    ) {
      state.articleIssave = false;
    }else{
      state.articleIssave = true;
    }
    return Object.assign({}, state);
  }
  if(action.type === "ALL_ARTICLES_CITY_OR_TITLE"){
    state.allArticles = action.payload;
    state.articleIsAdd = false;
    state.articleIsDelete = false;

    return Object.assign({}, state);
  }
  if (action.type=== "ONE_ARTICLES") {
    state.oneArticleItme = action.payload
    state.articleIsAdd = false;
    state.articleIsUpdate = false;
    state.articleIssave = false;
    return Object.assign({}, state);
  }
  if (action.type=== "MACTH_ARTICLE_BY_TITLE") {
    state.allMatch = action.payload
    return Object.assign({}, state);
  }
  if (action.type === "GET_USER_ARTICLES") {
    state.userArticle = action.payload
    return Object.assign({},state)
  }
  if(action.type === "DELETE_ARTICLES"){
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")||
      action.payload.hasOwnProperty("length")
    ) {
      state.articleIsDelete = false;
    }else{
      state.articleIsDelete = true;
    }
    return Object.assign({}, state);
  }
  /**********************************************************
   ************************ message ***********************
   ***********************************************************/
  if(action.type === "GET_MESSAGE"){
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")
    ) {
      state.myMsg = [];
    }else{
      state.myMsg = action.payload;
    }
    return Object.assign({}, state);
  }
  if(action.type === "USERS_MESSAGE"){
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")
    ) {
      state.userMsg = 0;
    }else{
      state.userMsg = action.payload;
      state.msgIsRead = false
    }
    return Object.assign({}, state);
  }
  if (action.type === "REFREC_MESSAGE") {
    state.getRefrec = action.payload;
    return Object.assign({}, state);
  }
  if (action.type === "READ_MESSAGE") {
    state.msgIsRead = true
    return Object.assign({}, state);
  }


  return state;
};

export default mainReducer;
