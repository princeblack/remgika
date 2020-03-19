const initialState = {
  isLoggedIn: false,
  sign: false,
  addPlay: false,
  personalPlayground: [],
  info: {},
  playground: [],
  loading: true
};

const mainReducer = (state = initialState, action) => {
  /**********************************************************
   ********************* USER LOGIN & SIGN-UP ***************
   ***********************************************************/
  if (action.type === "HANDLE_LOGIN") {
    if (action.payload.hasOwnProperty("error")) {
      state.isLoggedIn = false;
    } else {
      state.isLoggedIn = true;
      state.info = action.payload;
    }
    state.loading = false;
    return Object.assign({}, state);
  }
  if (action.type === "HANDLE_SIGN") {
    if (action.payload.hasOwnProperty("error")) {
      state.sign = false;
    } else {
      state.sign = true;
      state.isLoggedIn = true;
      state.info = action.payload;
    }
    state.loading = false;
    return Object.assign({}, state);
  }
  if (action.type === "HANDLE_LOGOUT") {
    console.log(state.info);
    state.isLoggedIn = false;
    console.log(state.isLoggedIn);

    return Object.assign({}, state);
  }
  /**********************************************************
   ************************ PLAYGROUND ***********************
   ***********************************************************/
  if (action.type === "FETCH_PLAYGROUND") {
    state.playground = [...state.playground, ...action.payload];
    return Object.assign({}, state);
  }
  if (action.type === "ADD_PLAYGROUND") {
    if (action.payload.hasOwnProperty("error")) {
      state.addPlay = false;
    } else {
      state.addPlay = true;
    }
    state.loading = false;
    return Object.assign({}, state);
  }
  if (action.type === "MY_PLAYGROUND") {
    state.personalPlayground = [...state.personalPlayground, ...action.payload];
    return Object.assign({}, state);
  }
  return state;
};

export default mainReducer;
