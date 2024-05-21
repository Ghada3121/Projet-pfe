import {
  ADDCHAT,
  ADDCHATDATA,
  ADDNOTIFICATION,
  GET_USERS,
  MODALGROUPOPEN,
} from "../constants/actions-types";

const initialState = {
  notification: [],
  chats: [],
  selectedChat: undefined,
  users: [],
};

const ChatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADDCHATDATA:
      return { ...state, selectedChat: payload };
    case ADDCHAT:
      return { ...state, chats: payload };
    case ADDNOTIFICATION:
      return {
        ...state,
        notification: payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};

export default ChatReducer;
