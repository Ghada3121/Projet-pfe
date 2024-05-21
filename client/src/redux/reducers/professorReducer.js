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

const initialState = {
  classToTeach: undefined,
  studentsList: undefined,
  subjects: undefined,
  verifyAbsence: undefined,
  absenceHistory: undefined,
  loading: false,
  examDateList: undefined,
  courseList: undefined,
  notesList: undefined,
};

const professorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFESSOR_CLASS_LIST:
      return {
        ...state,
        classToTeach: payload,
      };
    case GET_PROFESSOR_STUDENTS_LIST:
      return {
        ...state,
        studentsList: payload,
      };
    case GET_PROFESSOR_SUBJECTS:
      return {
        ...state,
        subjects: payload,
      };
    case GET_VERIFY_ABSENCES:
      return {
        ...state,
        verifyAbsence: payload.absences,
      };
    case GET_ABSENCE_HISTORY:
      return {
        ...state,
        absenceHistory: payload,
      };
    case GET_EXAM_DATE_LIST:
      return {
        ...state,
        examDateList: payload.ExamDate,
      };
    case GET_COURSE_DETAILS:
      return {
        ...state,
        courseList: payload,
      };

    case GET_STUDENTS_NOTES:
      return {
        ...state,
        notesList: payload,
      };

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
    default:
      return state;
  }
};

export default professorReducer;
