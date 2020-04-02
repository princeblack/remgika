const initialState = {
  loading: true,
  isLoggedIn: false,
  sign: false,
  addPlay: false,
  personalPlayground: [],
  info: {},
  playground: [],
  proImage: [],
  valideImg: false
};

const mainReducer = (state = initialState, action) => {
  /**********************************************************
   ********************* USER LOGIN & SIGN-UP ***************
   ***********************************************************/
  if (action.type === "HANDLE_USER") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")
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
      action.payload.hasOwnProperty("errors")
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
      action.payload.hasOwnProperty("errors")
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
      action.payload.hasOwnProperty("errors")
    ) {
      state.valideImg = false;
    } else {
      state.valideImg = true;
    }
    state.loading = false;
    return Object.assign({}, state);
  }
  if (action.type === "GET_PROFILE_IMAGE") {
    state.proImage = [...action.payload];
    return Object.assign({}, state);
  }

  if (action.type === "HANDLE_LOGOUT") {
    state.isLoggedIn = false;
    state.sign = false;
    return Object.assign({}, state);
  }
  /**********************************************************
   ************************ PLAYGROUND ***********************
   ***********************************************************/
  if (action.type === "FETCH_PLAYGROUND") {
    state.playground = [...action.payload];
    return Object.assign({}, state);
  }
  if (action.type === "ADD_PLAYGROUND") {
    if (
      action.payload.hasOwnProperty("error") ||
      action.payload.hasOwnProperty("errors")
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
      let results = action.payload[play]
      state.personalPlayground.push(results)
    }
    return Object.assign({}, state);
  }
  return state;
};

export default mainReducer;
