import axios from "axios";
import { errorToast, successToast, url } from "../../utils";
import {
  END_LOADING,
  GET_ABSENCE_HISTORY,
  GET_COURSE_DETAILS,
  GET_EXAM_DATE_LIST,
  GET_PROFESSOR_CLASS_LIST,
  GET_PROFESSOR_STUDENTS_LIST,
  GET_PROFESSOR_SUBJECTS,
  GET_STUDENTS_NOTES,
  GET_VERIFY_ABSENCES,
  LOADING,
} from "../constants/actions-types";

export const get_class_teach = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/professor/get_class_teach`,
      config
    );
    dispatch({ type: GET_PROFESSOR_CLASS_LIST, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
export const get_subject_teach = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/professor/get_subject_teach`,
      config
    );
    dispatch({ type: GET_PROFESSOR_SUBJECTS, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
export const get_class_Students =
  ({ groupId, setLoading, setShow }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.get(
        `${url}/api/v1/professor/get_class_students/${groupId}`,
        config
      );
      setLoading(false);
      dispatch({ type: GET_PROFESSOR_STUDENTS_LIST, payload: result.data });
      setShow(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
export const add_absences =
  ({ absences }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/professor/add-absences`,
        { absences },
        config
      );
      successToast("Absence Added ! ");
      dispatch(get_absence_history());
    } catch (error) {
      console.log(error);
    }
  };
export const get_absence_history = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/professor/absences/history`,
      config
    );

    dispatch({ type: GET_ABSENCE_HISTORY, payload: result.data.absences });
  } catch (error) {
    console.log(error);
  }
};
export const verify_absences =
  ({ subjectId, groupId, userId }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.get(
        `${url}/api/v1/professor/verify-absences/${subjectId}/${groupId}/${userId}`
      );

      dispatch({ type: GET_VERIFY_ABSENCES, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };

export const get_exam_date = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/professor/get-exam-date`,
      config
    );
    dispatch({ type: GET_EXAM_DATE_LIST, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
export const add_exam_date =
  ({ examDate, navigate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/professor/add-exam-date`,
        examDate,
        config
      );
      successToast("Exam Date Added");
      navigate("/professor/exam-list");
      dispatch({ type: END_LOADING });
      dispatch(get_exam_date());
    } catch (error) {
      dispatch({ type: END_LOADING });

      console.log(error);
    }
  };
export const add_course =
  ({ courseDetails, navigate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/professor/add-course`,
        courseDetails,
        config
      );
      successToast("Course Added");
      navigate("/professor/course-list");
      dispatch({ type: END_LOADING });
      dispatch(get_course());
    } catch (error) {
      dispatch({ type: END_LOADING });
      console.log(error);
    }
  };
export const get_course = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/professor/get-course`, config);
    dispatch({ type: GET_COURSE_DETAILS, payload: result.data.courses });
  } catch (error) {
    console.log(error);
  }
};

export const add_note =
  ({ score }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/professor/add-note`,
        score,
        config
      );
      successToast("Note added !");
    } catch (error) {
      errorToast(error?.response?.data?.message);
      console.log(error);
    }
  };
export const get_notes = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/professor/get-notes`, config);
    dispatch({ type: GET_STUDENTS_NOTES, payload: result.data.notes });
  } catch (error) {
    console.log(error);
  }
};
export const add_prof_absence =
  ({ absenceDetails }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/professor/add-prof-absence`,
        absenceDetails,
        config
      );
      dispatch({ type: END_LOADING });
      successToast("Absence Added ! ");
    } catch (error) {
      console.log(error);
    }
  };
