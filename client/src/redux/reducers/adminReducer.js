import {
  GET_GROUP_LIST,
  GET_EVENT_LIST,
  GET_PROFESSOR_LIST,
  GET_STUDENTS_LIST,
  GET_SUBJECT_LIST,
  LOADING,
  END_LOADING,
} from "../constants/actions-types";

const initialState = {
  groupList: undefined,
  subjectList: undefined,
  studentsList: undefined,
  professorList: undefined,
  eventList: undefined,
  loading: false,
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case END_LOADING:
      return {
        ...state,
        loading: false,
      };
    case GET_GROUP_LIST:
      return {
        ...state,
        groupList: payload,
      };
    case GET_SUBJECT_LIST:
      return {
        ...state,
        subjectList: payload,
      };
    case GET_EVENT_LIST:
      return {
        ...state,
        eventList: payload,
      };
    case GET_STUDENTS_LIST:
      return {
        ...state,
        studentsList: payload,
      };
    case GET_PROFESSOR_LIST:
      return {
        ...state,
        professorList: payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
