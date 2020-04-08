const initialState = {
  loading: true,
  isLoggedIn: false,
  sign: false,
  addPlay: false,
  personalPlayground: [],
  info: {},
  playground: [],
  proImage: [],
  valideImg: false,
  ImageIsDelete: false,
  playIsDelete : false
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
    debugger;
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
    state.loading = false;
    return Object.assign({}, state);
  }
  if (action.type === "GET_PROFILE_IMAGE") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")
    ) {
    } else {
      for (let proImage of Object.keys(action.payload)) {
        state.proImage = [action.payload[proImage]];
      }
    }
    return Object.assign({}, state);
  }

  if (action.type === "HANDLE_LOGOUT") {
    state.isLoggedIn = false;
    state.sign = false;
    state.valideImg = false;
    console.log(action.payload);

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
    for (let playground of Object.keys(action.payload)) {
      state.playground = [...state.playground, action.payload[playground]];
    }
    return Object.assign({}, state);
  }
  if (action.type === "ADD_PLAYGROUND") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors") ||
      action.payload.hasOwnProperty("length")
    ) {
      state.addPlay = false;
    } else {
      state.addPlay = true;
    }
    state.loading = false;
    return Object.assign({}, state);
  }
  if (action.type === "MY_PLAYGROUND") {
    for (let play of Object.keys(action.payload)) {
      state.personalPlayground = [action.payload[play]];
    }
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
  return state;
};

export default mainReducer;
