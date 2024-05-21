import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import adminReducer from "./adminReducer";
import studentReducer from "./studentReducer";
import professorReducer from "./professorReducer";
import ChatReducer from "./chatReducer";
const rootReducer = combineReducers({
  LoginReducer,
  adminReducer,
  studentReducer,
  professorReducer,
  ChatReducer,
});

export default rootReducer;
