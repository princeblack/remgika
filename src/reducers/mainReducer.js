const initialState = {
  // Log and Sign and user Info
  loading: true,
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
  commentIsDelete: false
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
      state.info = action.payload;
    }
    state.loading = false;

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
  return state;
};

export default mainReducer;
