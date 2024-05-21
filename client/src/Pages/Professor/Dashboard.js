import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_class_teach,
  get_course,
  get_subject_teach,
} from "../../redux/actions/professorActions";
import { get_event_list } from "../../redux/actions/adminActions";

const DashboardProfessor = () => {
  const { user } = useSelector((state) => state.LoginReducer);
  const { classToTeach, courseList, subjects } = useSelector(
    (state) => state.professorReducer
  );
  const { eventList } = useSelector((state) => state.adminReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_class_teach());
    dispatch(get_subject_teach());
    dispatch(get_course());
    dispatch(get_event_list());
  }, []);

  return (
    <div className="pcoded-content">
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            {/* Page-body start */}
            <div className="page-body">
              {/* Row start */}
              <div className="row m-round">
                <div
                  className="col-lg-3 col-md-12 text-center m-round m-b-20"
                  style={{ background: "#fff" }}
                >
                  <div style={{ paddingTop: 25 }}>
                    <img
                      src={user?.avatar}
                      className="img-circle"
                      style={{
                        width: 140,
                        height: 140,
                        border: "6px solid #f6f7fb",
                        boxShadow: "0px 0px 3px 8px #f6f7fb",
                        padding: 1,
                      }}
                    />
                  </div>
                  <div style={{ paddingTop: 15 }}>
                    <h4
                      style={{ margin: 0, lineHeight: 5 }}
                      className="gradient-blue f-24"
                    >
                      {user?.fullName}
                    </h4>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="m-main row">
                    <div
                      className="m-container order-card p-t-10 p-b-0"
                      style={{
                        backgroundImage:
                          'url("https://www.eskooly.com/bb/asserts/images/apploginbg.jpg")',
                        opacity: 1,
                        backgroundSize: "cover",
                        borderRadius: 5,
                        borderTopLeftRadius: 15,
                        borderBottomRightRadius: 25,
                      }}
                    >
                      {/*-------start---------------*/}
                      <h6
                        className="bg-m-blue1 m-white m-0 p-10 m-b-0"
                        style={{
                          paddingTop: 2,
                          paddingBottom: 2,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 5,
                        }}
                      >
                        <strong className="m-b-5 m-white f-10">
                          <img
                            src="https://www.eskooly.com/bb/assets/hi.png"
                            style={{ width: 14, display: "inline" }}
                          />
                          <span style={{ color: "#fff", fontWeight: "normal" }}>
                            {" "}
                            Welcome{" "}
                          </span>
                          <span
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            {user?.fullName}

                            <img
                              src="https://eskooly.com/bb/Desktop/images/shape/line-shape-12.svg"
                              style={{
                                left: 0,
                                bottom: "-12px",
                                width: 80,
                                position: "absolute",
                              }}
                              alt=""
                              className="cs-screen"
                            />
                          </span>
                          <span style={{ color: "#fff", fontWeight: "normal" }}>
                            {" "}
                            at <b className="m-white">Professor</b> Dashboard.
                          </span>
                        </strong>
                      </h6>
                      <div
                        className="row p-0"
                        style={{
                          background: "rgba(33, 13, 166, 0.4)",
                          boxShadow: "5px 5px #273fde",
                          borderRadius: 5,
                          borderTopLeftRadius: 15,
                          borderBottomRightRadius: 25,
                        }}
                      ></div>
                      {/*------end-----------------*/}
                      <img
                        src="https://www.eskooly.com/bb/assets/images/user-message.png"
                        className="img-1"
                      />
                    </div>
                  </div>
                  <div
                    className="col-12 "
                    style={{ marginTop: 8, marginBottom: 10 }}
                  >
                    <div className="row p-l-15 p-r-15">
                      <div className="col-4" style={{ padding: 4 }}>
                        <div className="bg-m-blue1" style={{ borderRadius: 6 }}>
                          <div
                            className="m-white"
                            style={{
                              padding: 8,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <h6 className="f-12" style={{ marginBottom: 0 }}>
                              Groups
                            </h6>
                            <h3
                              className="f-16 m-t-0 m-b-0"
                              style={{ lineHeight: 2 }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/zmkotitn.json"
                                trigger="loop"
                                delay={2000}
                                colors="primary:#ffffff"
                                style={{
                                  width: 20,
                                  height: 20,
                                  display: "inline-block",
                                }}
                              ></lord-icon>
                              <span
                                style={{
                                  display: "inline-block",
                                  float: "right",
                                }}
                              >
                                {classToTeach?.length}
                              </span>
                            </h3>
                            <p className="m-b-0 m-t-0" style={{ fontSize: 9 }}>
                              Groups
                              <span className="f-right">
                                {" "}
                                {classToTeach?.length}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4" style={{ padding: 4 }}>
                        <div className="bg-m-gray" style={{ borderRadius: 6 }}>
                          <div
                            className="m-white"
                            style={{
                              padding: 8,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <h6 className="f-12" style={{ marginBottom: 0 }}>
                              Courses
                            </h6>
                            <h3
                              className="f-16 m-t-0 m-b-0"
                              style={{ lineHeight: 2 }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/zmkotitn.json"
                                trigger="loop"
                                delay={2100}
                                colors="primary:#ffffff"
                                style={{
                                  width: 20,
                                  height: 20,
                                  display: "inline-block",
                                }}
                              ></lord-icon>
                              <span
                                style={{
                                  display: "inline-block",
                                  float: "right",
                                }}
                              >
                                {courseList?.length}
                              </span>
                            </h3>
                            <p className="m-b-0 m-t-0" style={{ fontSize: 9 }}>
                              Courses
                              <span className="f-right">
                                {courseList?.length}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4" style={{ padding: 4 }}>
                        <div
                          className="bg-m-orange"
                          style={{ borderRadius: 6 }}
                        >
                          <div
                            className="m-white"
                            style={{
                              padding: 8,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <h6 className="f-12" style={{ marginBottom: 0 }}>
                              Subjects
                            </h6>
                            <h3
                              className="f-16 m-t-0 m-b-0"
                              style={{ lineHeight: 2 }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/zmkotitn.json"
                                trigger="loop"
                                delay={2200}
                                colors="primary:#ffffff"
                                style={{
                                  width: 20,
                                  height: 20,
                                  display: "inline-block",
                                }}
                              ></lord-icon>
                              <span
                                style={{
                                  display: "inline-block",
                                  float: "right",
                                }}
                              >
                                {subjects?.length}
                              </span>
                            </h3>
                            <p className="m-b-0 m-t-0" style={{ fontSize: 9 }}>
                              Subjects
                              <span className="f-right">
                                {subjects?.length}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 "
                    style={{ marginTop: 8, marginBottom: 10 }}
                  >
                    <img
                      src={user?.profRoutine}
                      alt="prof routine"
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-t-20">
                <h6 className="w-100">
                  <span style={{ fontSize: 12 }} className="f-right" />
                </h6>
                <div
                  className="row p-20 p-t-20 p-b-20"
                  style={{
                    borderRadius: 5,
                    paddingBottom: 10,
                    paddingLeft: 4,
                    paddingRight: 4,
                    background: "#FFF",
                    border: "1px solid white",
                    borderTopLeftRadius: 15,
                    borderBottomRightRadius: 25,
                  }}
                >
                  <div className="col-6"></div>
                  <div className="col-6"></div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 p-0">
                        <div
                          className="bg-gradient-blue m-white"
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            display: "inline-block",
                            paddingLeft: 5,
                            marginRight: 5,
                          }}
                        >
                          1
                        </div>
                        <strong className="gradient-blue f-16">
                          Event Info{" "}
                        </strong>{" "}
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        {eventList?.length > 0 ? (
                          <>
                            <table className="table table-striped">
                              <tbody>
                                <tr className="m-dblue">
                                  <td>
                                    <b>Event Title</b>
                                  </td>
                                  <td>
                                    <b>Description</b>
                                  </td>
                                </tr>
                                {eventList?.map((event, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="">{event.title}</td>
                                      <td className="">{event.description}</td>
                                      <td> </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </>
                        ) : (
                          <p className="text-center m-gray f-12 m-t-10">
                            <img
                              src="https://www.eskooly.com/bb/assets/nf.webp"
                              style={{ width: 200 }}
                            />
                            <br />
                            <strong>
                              <i className="ti-search" /> No Record Found.
                            </strong>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row end */}
              {/* Row start */}
              {/* Row end */}
            </div>
            {/* Page-body end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfessor;
