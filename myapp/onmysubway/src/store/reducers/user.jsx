// initialState
const initialState = {
  userId: "",
  userName: "",
  userToken: "",
  endSt: "",
};

// Action Type
export const LOGGED_IN = "user/LOGGED_IN";
export const LOGGED_OUT = "user/LOGGED_OUT";
export const SET_END_ST = "user/SET_END_ST";

// Action Creator
export const loginUser = ({ user_id, user_name, user_token }) => ({
  type: LOGGED_IN,
  payload: { user_id, user_name, user_token },
});

export const logoutUser = () => ({
  type: LOGGED_OUT,
  payload: {},
});

export const setEndSt = ({ endSt }) => ({
  type: SET_END_ST,
  payload: { endSt },
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        userId: action.payload.user_id,
        userName: action.payload.user_name,
        userToken: action.payload.user_token,
      };
    case LOGGED_OUT:
      return { ...state, userId: "", userName: "", userToken: "", endSt: "" };
    case SET_END_ST:
      return { ...state, endSt: action.payload.endSt };
    default:
      return state;
  }
}

export default userReducer;
