import axios from "axios";
import { url } from "../../utils";
import {
  GET_PROF_ABSENCE,
  GET_STUDENT_ABSENCE,
  GET_STUDENT_COURSES,
  GET_STUDENT_EXAM_DATE,
  GET_STUDENT_EXAM_SCORES,
  GET_STUDENT_GROUP,
} from "../constants/actions-types";

export const get_student_absence = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/student/absences`, config);

    dispatch({ type: GET_STUDENT_ABSENCE, payload: result.data.absences });
  } catch (error) {
    console.log(error);
  }
};
export const get_student_exam_date = (groupId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/student/get-exam-date/${groupId}`,
      config
    );
    dispatch({ type: GET_STUDENT_EXAM_DATE, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
export const get_student_exam_scores = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/student/get-exam-scores`,
      config
    );
    dispatch({ type: GET_STUDENT_EXAM_SCORES, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
export const get_student_course = (groupId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/student/get-course/${groupId}`,
      config
    );
    dispatch({ type: GET_STUDENT_COURSES, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
export const get_student_group = (groupId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/student/get-group/${groupId}`,
      config
    );
    dispatch({ type: GET_STUDENT_GROUP, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
export const get_prof_absence = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/student/get-prof-absence`,
      config
    );
    dispatch({ type: GET_PROF_ABSENCE, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
