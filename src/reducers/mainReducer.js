const initialState = {
  isLoggedIn: false,
  sign: false,
  info: {},
  playground: [],
  loading: true
};

const mainReducer = (state = initialState, action) => {

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
    state.isLoggedIn = false;
    return Object.assign({}, state);
  }

  if (action.type === "FETCH_PLAYGROUND") {
    state.isLoggedIn = true;
    state.playground = [...state.playground, ...action.payload];

    return Object.assign({}, state);
  }

  return state;
};

export default mainReducer;
