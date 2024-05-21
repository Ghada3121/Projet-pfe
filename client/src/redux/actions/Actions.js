import {
  CURRENT_USER,
  END_LOADING,
  ERROR,
  GET_USERS,
  LOADING,
  LOGIN_USER,
} from "../constants/actions-types";
import axios from "axios";
import { errorToast, successToast, url } from "../../utils";

export const login =
  ({ loginDetails, navigate }) =>
  (dispatch) => {
    dispatch({ type: LOADING });
    axios
      .post(`${url}/api/v1/auth/login`, loginDetails)
      .then((response) => {
        dispatch({ type: LOGIN_USER, payload: response.data.data });
        successToast(response.data.message);
        loginDetails.role === "Admin"
          ? navigate("/admin/dashboard")
          : loginDetails.role === "Professor"
          ? navigate("/professor/dashboard")
          : navigate("/student/dashboard");
        dispatch(current());
        dispatch({ type: END_LOADING });
      })
      .catch((err) => {
        errorToast(err.response.data.message);
      });
  };

export const current = (navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    await axios
      .get(`${url}/api/v1/auth/current`, config)
      .then((res) => dispatch({ type: CURRENT_USER, payload: res.data }));
  } catch (error) {
    if (error.response.data.message === "Access denied , no token Provided") {
      localStorage.removeItem("accessToken");
      // window.location.reload();
      navigate("/login");
    }
  }
};
export const get_Users = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    await axios
      .get(`${url}/api/v1/chat/get/users`, config)
      .then((res) => dispatch({ type: GET_USERS, payload: res.data }));
  } catch (error) {
    console.log(error);
  }
};
