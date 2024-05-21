import {
  GET_PROF_ABSENCE,
  GET_STUDENT_ABSENCE,
  GET_STUDENT_COURSES,
  GET_STUDENT_EXAM_DATE,
  GET_STUDENT_EXAM_SCORES,
  GET_STUDENT_GROUP,
} from "../constants/actions-types";

const initialState = {
  absences: undefined,
  examDate: undefined,
  examScores: undefined,
  courseList: undefined,
  studentGroup: undefined,
  profAbsence: undefined,
};

const studentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STUDENT_ABSENCE:
      return {
        ...state,
        absences: payload,
      };
    case GET_STUDENT_EXAM_DATE:
      return {
        ...state,
        examDate: payload,
      };
    case GET_STUDENT_EXAM_SCORES:
      return {
        ...state,
        examScores: payload,
      };
    case GET_STUDENT_COURSES:
      return {
        ...state,
        courseList: payload,
      };
    case GET_STUDENT_GROUP:
      return {
        ...state,
        studentGroup: payload,
      };
    case GET_PROF_ABSENCE:
      return {
        ...state,
        profAbsence: payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
