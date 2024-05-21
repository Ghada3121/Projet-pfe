import axios from "axios";
import { errorToast, successToast, url } from "../../utils";
import {
  END_LOADING,
  GET_EVENT_LIST,
  GET_GROUP_LIST,
  GET_PROFESSOR_LIST,
  GET_STUDENTS_LIST,
  GET_SUBJECT_LIST,
  LOADING,
} from "../constants/actions-types";

export const get_group_list = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/admin/get_group_list`, config);
    dispatch({ type: GET_GROUP_LIST, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
// add new group
export const addGroup = ({ groupData, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });

    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.post(
        `${url}/api/v1/admin/add_group`,
        groupData,
        config
      );
      dispatch({ type: END_LOADING });
      navigate("/admin/groups-list");
      dispatch(get_group_list());
    } catch (error) {
      dispatch({ type: END_LOADING });
      errorToast(error.message);
    }
  };
};
// edit  group
export const editGroup = ({ groupData, id, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });

    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.put(
        `${url}/api/v1/admin/edit_group/${id}`,
        groupData,
        config
      );
      dispatch({ type: END_LOADING });
      successToast("group Updated ! ");
      navigate("/admin/groups-list");
      dispatch(get_group_list());
    } catch (error) {
      dispatch({ type: END_LOADING });
      errorToast(error.message);
    }
  };
};
// delete  group
export const deleteGroup = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.delete(
        `${url}/api/v1/admin/delete_group/${id}`,
        config
      );
      dispatch({ type: END_LOADING });
      successToast("group Deleted !");
      dispatch(get_group_list());
    } catch (error) {
      errorToast(error.message);
    }
  };
};

// subject list
export const get_subject_list = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/admin/subject_list`, config);
    dispatch({ type: GET_SUBJECT_LIST, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
// update subject
export const updateSubject = ({ nameOfSubject, id, navigate }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.put(
        `${url}/api/v1/admin/update_subject/${id}`,
        { nameOfSubject },
        config
      );
      dispatch(get_subject_list());
      dispatch({ type: END_LOADING });
      successToast("Subject Name Updated ! ");
      navigate("/admin/subjects-list");
    } catch (error) {
      dispatch({ type: END_LOADING });

      errorToast(error.message);
    }
  };
};
// delete subject
export const deleteSubject = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.delete(
        `${url}/api/v1/admin/delete_subject/${id}`,
        config
      );
      dispatch(get_subject_list());
      dispatch({ type: END_LOADING });
      successToast("Subject Name Deleted ! ");
    } catch (error) {
      dispatch({ type: END_LOADING });

      errorToast(error.message);
    }
  };
};
// add subject
export const addSubject = ({ nameOfSubject, navigate }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.post(
        `${url}/api/v1/admin/add_subject`,
        { nameOfSubject },
        config
      );
      dispatch(get_subject_list());
      dispatch({ type: END_LOADING });
      successToast("Subject Added ! ");
      navigate("/admin/subjects-list");
    } catch (error) {
      dispatch({ type: END_LOADING });
      errorToast(error.message);
    }
  };
};

//get students list

export const getStudentList = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.get(
        `${url}/api/v1/admin/students_list`,
        config
      );
      dispatch({ type: GET_STUDENTS_LIST, payload: response.data });
    } catch (error) {
      errorToast(error.message);
    }
  };
};

// add new student
export const addStudent = ({ studentDetails, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      await axios.post(
        `${url}/api/v1/admin/add_student`,
        studentDetails,
        config
      );
      dispatch(getStudentList());
      dispatch({ type: END_LOADING });
      successToast("student added !");
      navigate("/admin/students-list");
    } catch (error) {
      dispatch({ type: END_LOADING });
      errorToast(error.message);
    }
  };
};
// edit  student
export const editStudent = ({ studentDetails, id, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      await axios.put(
        `${url}/api/v1/admin/edit_student/${id}`,
        studentDetails,
        config
      );
      dispatch(getStudentList());
      dispatch({ type: END_LOADING });
      successToast("student updated !");
      navigate("/admin/students-list");
    } catch (error) {
      dispatch({ type: END_LOADING });
      errorToast(error.message);
    }
  };
};
// delete  student
export const deleteStudent = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      await axios.delete(`${url}/api/v1/admin/delete_student/${id}`, config);
      dispatch(getStudentList());
      successToast("student Deleted !");
    } catch (error) {
      errorToast(error.message);
    }
  };
};

//get professor list
export const getProfessorList = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.get(
        `${url}/api/v1/admin/professor_list`,
        config
      );
      dispatch({ type: GET_PROFESSOR_LIST, payload: response.data });
    } catch (error) {
      errorToast(error.message);
    }
  };
};
// add new professor
export const addProfessor = ({ professorDetails, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      await axios.post(
        `${url}/api/v1/admin/add_professor`,
        professorDetails,
        config
      );
      dispatch(getStudentList());
      dispatch({ type: END_LOADING });
      successToast("professor added !");
      navigate("/admin/professors-list");
    } catch (error) {
      console.log(error);
      dispatch({ type: END_LOADING });
      errorToast(error.message);
    }
  };
};
// edit  professor
export const editProfessor = ({ professorDetails, id, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      await axios.put(
        `${url}/api/v1/admin/edit_professor/${id}`,
        professorDetails,
        config
      );
      dispatch(getProfessorList());
      dispatch({ type: END_LOADING });
      successToast("Professor updated !");
      navigate("/admin/professors-list");
    } catch (error) {
      dispatch({ type: END_LOADING });
      errorToast(error.message);
    }
  };
};
// delete professor
export const deleteProfessor = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      await axios.delete(`${url}/api/v1/admin/delete_professor/${id}`, config);
      dispatch(getProfessorList());
      successToast("student Professor !");
    } catch (error) {
      errorToast(error.message);
    }
  };
};

// event list
export const get_event_list = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/admin/Calendar`, config);
    dispatch({ type: GET_EVENT_LIST, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
// update event
export const updateEvent = ({ eventDetails, id, navigate }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.put(
        `${url}/api/v1/admin/Calendar/${id}`,
        { eventDetails },
        config
      );
      dispatch(get_event_list());
      dispatch({ type: END_LOADING });
      successToast("Event  Updated ! ");
      navigate("/admin/event-list");
    } catch (error) {
      dispatch({ type: END_LOADING });

      errorToast(error.message);
    }
  };
};
// delete event
export const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.delete(
        `${url}/api/v1/admin/Calendar/${id}`,
        config
      );
      dispatch(get_event_list());
      dispatch({ type: END_LOADING });
      successToast("Event Deleted ! ");
    } catch (error) {
      errorToast(error.message);
    }
  };
};
// add event
export const addEvent = ({ eventDetails, navigate }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.post(
        `${url}/api/v1/admin/Calendar`,
        { eventDetails },
        config
      );
      dispatch(get_event_list());
      dispatch({ type: END_LOADING });
      successToast("Event Added ! ");
      navigate("/admin/event-list");
    } catch (error) {
      dispatch({ type: END_LOADING });
      console.log(error);
      errorToast(error.message);
    }
  };
};
