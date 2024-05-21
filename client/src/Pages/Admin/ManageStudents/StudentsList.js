import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteStudent,
  getStudentList,
} from "../../../redux/actions/adminActions";

const StudentsList = () => {
  const { studentsList } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentList());
  }, []);

  return (
    <div className="pcoded-content">
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            {/* Page-body start */}
            <div className="page-body">
              {/* Row start */}
              <div
                className="row"
                style={{
                  border: "0px solid #9698d6",
                  padding: "5px 5px 5px 15px",
                }}
              >
                <div
                  className="col-12 p-10 f-14"
                  style={{
                    borderRadius: 10,
                    background: "#fff",
                    boxShadow: "0px 0px 1px 0px gray",
                    marginBottom: "20px",
                  }}
                >
                  <strong
                    style={{
                      borderRight: "1px solid #777",
                      paddingRight: 10,
                      marginRight: 10,
                    }}
                  >
                    Students
                  </strong>
                  <i className="ti-ruler-pencil" /> - Students List
                </div>
                <div
                  className="col-md-6 col-xl-4"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <form>
                    <input
                      type="text"
                      id="tags1"
                      placeholder="Search Student"
                      style={{
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid gray",
                        padding: "9px 10px 8px 10px",
                        display: "inline-block",
                        width: "80%",
                      }}
                      className="ui-autocomplete-input"
                      autoComplete="off"
                    />
                    <input
                      id="idsearch"
                      type="text"
                      name="searchby"
                      placeholder="ID"
                      style={{ display: "none" }}
                      required=""
                    />
                    <button
                      type="submit"
                      className="btn"
                      name="searchid"
                      style={{
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid gray",
                        padding: "9px 10px 8px 10px",
                        display: "inline-block",
                      }}
                    >
                      <i className="ti-search" />
                    </button>
                  </form>
                </div>
                <div className="col-md-6 col-xl-4">
                  <form id="myform">
                    <select
                      name="searchby"
                      style={{
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid gray",
                        padding: "9px 10px 8px 10px",
                        width: "80%",
                      }}
                    >
                      <option value=""> --select class-- </option>
                      <option value={64223}>1 S 1</option>
                      <option value={158093}>MSI</option>
                    </select>
                    <button
                      type="submit"
                      name="searchclass"
                      className="btn"
                      style={{
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid gray",
                        padding: "9px 10px 8px 10px",
                      }}
                    >
                      <i className="ti-search" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="row" style={{ marginTop: 20 }}>
                {studentsList?.map((student, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        float: "left",
                        textAlign: "center",
                        margin: 10,
                        width: 155,
                        background: "#fff",
                        padding: 15,
                      }}
                      className="m-round"
                    >
                      <img
                        src={student.avatar}
                        className="img-circle"
                        style={{ width: 80, height: 80 }}
                      />
                      <br />
                      <span style={{ fontSize: 11, color: "#333" }}>
                        {student.groups?.nameOfGroup}
                      </span>
                      <br />
                      <b style={{ fontSize: 11, color: "#555" }}>
                        {student.fullName}
                      </b>
                      <br />
                      <form>
                        <input
                          type="text"
                          name="id"
                          defaultValue={123}
                          style={{ display: "none" }}
                        />
                        <br />

                        <Link
                          className="btn btn-sm m-round bg-m-blue1 m-white"
                          to={`/admin/edit-student/${student._id}`}
                          style={{
                            border: 0,
                            width: 30,
                            height: 30,
                            padding: 8,
                          }}
                          name="sedit"
                          title="edit"
                        >
                          <i className="ti-pencil" />
                        </Link>
                        <button
                          className="btn btn-sm m-round bg-m-orange m-white"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(deleteStudent(student._id));
                          }}
                          type="submit"
                          style={{
                            border: 0,
                            width: 30,
                            height: 30,
                            padding: 9,
                          }}
                          name="sdelete"
                          title="delete"
                        >
                          <i className="ti-trash" />
                        </button>
                      </form>
                    </div>
                  );
                })}

                <Link to="/admin/add-student">
                  <button
                    className="btn bg-m-blue m-white"
                    style={{
                      float: "left",
                      textAlign: "center",
                      margin: 15,
                      width: 155,
                      height: 155,
                      borderRadius: "50%",
                    }}
                  >
                    <i className="ti-plus" />
                    <br />
                    Add New
                  </button>
                </Link>
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

export default StudentsList;
