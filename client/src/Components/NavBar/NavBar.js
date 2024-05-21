import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_prof_absence } from "../../redux/actions/studentActions";

const Navbar = () => {
  const [dropdown, setDropdown] = useState({
    notification: false,
    userInfo: false,
  });
  const handleActive = (el) => {
    if (el === "notification") {
      setDropdown({ userInfo: false, notification: !dropdown.notification });
    } else if (el === "userInfo") {
      setDropdown({ userInfo: !dropdown.userInfo, notification: false });
    } else {
      setDropdown({ notification: false, userInfo: false });
    }
  };
  const { user } = useSelector((state) => state.LoginReducer);
  const { profAbsence } = useSelector((state) => state.studentReducer);
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_prof_absence());
  }, []);
  return (
    <nav
      className="navbar header-navbar pcoded-header iscollapsed"
      header-theme="theme5"
      pcoded-header-position="fixed"
    >
      <div className="navbar-wrapper">
        <div className="navbar-logo" logo-theme="theme1">
          <Link className="mobile-menu" id="mobile-collapse" to="#!">
            <i className="ti-menu" />
          </Link>
          {/*eslint-disable-next-line*/}
          <Link to="#">
            <img
              className="img-fluid m-l-30"
              id="headerimg"
              style={{ maxHeight: 45 }}
              src="https://eskooly.com/bb/assets/images/logo.png"
              alt="eSkooly-Logo"
            />
          </Link>
        </div>
        <div className="navbar-container container-fluid">
          <ul className="nav-left">
            <li>
              {/*eslint-disable-next-line*/}
              <Link to="#!">
                <i className="ti-fullscreen" />
              </Link>
            </li>
          </ul>
          <ul className="nav-right">
            <li className="header-notification">
              {/*eslint-disable-next-line*/}
              <Link
                to={`${
                  user?.role === "admin"
                    ? "admin"
                    : user?.role === "professor"
                    ? "professor"
                    : "student"
                }/messages`}
              >
                <i className="ti-comments" />
                <span id="msgaya" className="badge bg-c-green f-10" />
              </Link>
            </li>
            <li
              className={`header-notification ${
                dropdown.notification ? "active" : ""
              }`}
            >
              {/*eslint-disable-next-line*/}
              <Link to="#!" onClick={() => handleActive("notification")}>
                <i className="ti-bell" />
                <span className="badge bg-m-orange f-10" />
              </Link>
              <ul
                className={`show-notification profile-notification ${
                  dropdown.notification ? "d-block" : "d-none"
                }`}
              >
                <li>
                  {/*eslint-disable-next-line*/}
                  <Link to="#">
                    {user?.role === "student"
                      ? profAbsence?.map((el) => {
                          return (
                            <>
                              <i className="ti-info-alt"></i>
                              {` Professor ${
                                el.addedBy.fullName
                              } is Absente ${el.start_date.slice(
                                0,
                                10
                              )} - ${el.end_date.slice(0, 10)}`}
                            </>
                          );
                        })
                      : null}
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className={`user-profile header-notification ${
                dropdown.userInfo ? "active" : ""
              }`}
            >
              {/*eslint-disable-next-line*/}
              <Link to="#!" onClick={() => handleActive("userInfo")}>
                <img
                  src={user?.avatar}
                  className="img-radius"
                  alt="imgradius"
                />
                <span title="Institute Name" className="capitalize">
                  {user?.fullName}
                </span>
                <i className="ti-angle-down" />
              </Link>
              <ul
                className={`show-notification profile-notification ${
                  dropdown.userInfo ? "d-block" : "d-none"
                }`}
              >
                <li>
                  {/*eslint-disable-next-line*/}
                  <Link to="#">
                    <i className="ti-settings" /> Account Settings
                  </Link>
                </li>
                {/* {user?.role !== "admin" ? (
                  <li>
                     <Link to="#">
                      <i className="fa fa-bank" /> Profile
                    </Link>
                  </li>
                ) : null} */}
                <li onClick={handleLogOut}>
                  {/*eslint-disable-next-line*/}
                  <Link to="#">
                    <i className="ti-lock" /> Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
