import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { calculateTimeSince, errorToast, getSender, url } from "../../utils";
import {
  add_Chat,
  add_selectedChat,
  fetchChats,
} from "../../redux/actions/chatActions";
import { current, get_Users } from "../../redux/actions/Actions";
import { Link } from "react-router-dom";
const MessageSideBar = ({ fetchAgain }) => {
  const { chats, selectedChat, users } = useSelector(
    (state) => state.ChatReducer
  );
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (search !== "") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [search]);

  const { user } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_Users());
    dispatch(current());
  }, []);
  useEffect(() => {
    dispatch(fetchChats());
  }, [user, fetchAgain]);

  useEffect(() => {
    if (chats.length > 0) {
      dispatch(add_selectedChat(chats[0]));
    }
  }, [chats]);
  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const { data } = await axios.post(
        `${url}/api/v1/chat`,
        {
          userId,
        },
        config
      );
      if (!chats.find((c) => c._id === data._id))
        dispatch(add_Chat([data, ...chats]));
      dispatch(add_selectedChat(data));
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div>
      {/* Messages */}
      <div className="messages-inbox">
        <div className="messages-headline">
          <div className="input-with-icon">
            <input
              id="autocomplete-input"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa-regular fa-search" />
            <div
              className={` flex-column users-list ${
                show ? "d-flex" : "d-none"
              }`}
            >
              {users
                ?.filter((el) => el._id !== user?._id)
                .filter((el) =>
                  el?.fullName.toLowerCase().includes(search.toLowerCase())
                )
                .map((el, index) => {
                  return (
                    <span
                      onClick={() => {
                        accessChat(el._id);
                        setShow(false);
                      }}
                      key={index}
                      style={{ cursor: "pointer" }}
                    >
                      {el.fullName}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
        <ul>
          {chats?.length > 0 ? (
            chats.map((chat, index) => {
              return (
                // add className active-message for active discussion
                <li
                  className={
                    selectedChat?._id === chat._id ? "active-message" : ""
                  }
                  key={index}
                  onClick={() => dispatch(add_selectedChat(chat))}
                >
                  <Link to="#">
                    <div className="message-avatar">
                      <i className="status-icon status-offline" />
                      <img
                        src={
                          chat.users.find((el) => el._id !== user._id).avatar
                        }
                        alt=""
                      />
                    </div>
                    <div className="message-by">
                      <div className="message-by-headline">
                        <h5>{`${getSender(user, chat?.users).fullName}`}</h5>
                        <span>{calculateTimeSince(chat.updatedAt)}</span>
                      </div>
                      <p>{chat?.latestMessage?.message}</p>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <li>
              <a href="#">
                <div className="message-avatar">
                  <p>There's No Chat yet ! </p>
                </div>
              </a>
            </li>
          )}
        </ul>
      </div>
      {/* Messages / End */}
    </div>
  );
};

export default MessageSideBar;
