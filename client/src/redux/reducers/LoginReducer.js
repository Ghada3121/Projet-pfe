import {
  CURRENT_USER,
  END_LOADING,
  ERROR,
  LOADING,
  LOGIN_USER,
} from "../constants/actions-types";

const initialState = {
  user: {},
  userLoading: true,
  isAuth: false,
  loading: false,
  role: "",
  error: undefined,
};

const LoginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      localStorage.setItem("accessToken", payload);
      return {
        ...state,
        isAuth: true,
        role: payload.role,
        error: undefined,
      };
    case CURRENT_USER:
      return {
        ...state,
        user: payload.user,
        userLoading: false,
        isAuth: true,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case END_LOADING:
      return { ...state, loading: false };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;
