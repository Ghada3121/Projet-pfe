import React, { useEffect, useState } from "react";
import { login } from "../../redux/actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "../../utils";
import admin from "./images/admin.png";
import student from "./images/student.png";
import prof from "./images/prof.png";
const Login = () => {
  const navigate = useNavigate();
  const { loading, isAuth, role, error } = useSelector(
    (state) => state.LoginReducer
  );

  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    if (!loginDetails.email.includes("@")) {
      errorToast("Email Not Valid");
    }
    e.preventDefault();
    dispatch(
      login({
        loginDetails: {
          ...loginDetails,
          role: profile.find((el) => el.active === true).name,
        },
        navigate,
      })
    );
  };

  const [profile, setProfile] = useState([
    {
      id: 1,
      img: admin,
      name: "Admin",
      active: true,
    },
    {
      id: 2,
      img: prof,
      name: "Professor",
      active: false,
    },
    {
      id: 3,
      img: student,
      name: "Student",
      active: false,
    },
  ]);
  const changeActiveProfile = (id) => {
    const updatedProfile = profile.map((item) =>
      item.id === id ? { ...item, active: true } : { ...item, active: false }
    );
    setProfile(updatedProfile);
  };
  return (
    <div className="login_page">
      <div className="login_left">
        <img
          src="https://eskooly.com/bb/asserts/images/logos/eskooly.png"
          className="top-logo"
          alt=""
        />
        <p className="text-bold">I am </p>
        <div className="all-profile">
          {profile.map((profile, index) => {
            return (
              <div
                className={`profile ${profile.active ? "active" : ""}`}
                onClick={() => changeActiveProfile(profile.id)}
              >
                <img src={profile.img} alt="user_img" />
                <p>{profile.name}</p>
              </div>
            );
          })}
        </div>
        <div className="form">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-large"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <span className="icon is-left">
                <i className="fa-regular fa-user" />
              </span>
            </div>
            <div className="control has-icons-left">
              <input
                className="input is-large"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <span className="icon is-left">
                <i className="fa-regular fa-lock" />
              </span>
            </div>
            <div className="field pb-10">
              <div className="">
                <p style={{ color: "#999" }}>
                  <input
                    id="remember"
                    name="remember"
                    defaultValue={1}
                    type="checkbox"
                  />{" "}
                  Remember Me
                </p>
              </div>
            </div>
            <button className="button bg-primary m-auto" onClick={handleSubmit}>
              Log in
            </button>
          </div>
        </div>
      </div>
      <div className="login-right">
        <h2>Start managing now</h2>
        <p>
          Stop struggling with common tasks and focus on the real choke points.
          Discover a full featured & 100% Free School management platform.
        </p>
        <button className="button">Get Started</button>
        <img
          src="https://eskooly.com/bb/asserts/images/illustrations/drawings/login4.png"
          alt=""
          className="_img"
        />
      </div>
    </div>
  );
};

export default Login;
