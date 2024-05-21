import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import adminReducer from "../../../redux/reducers/adminReducer";
import {
  deleteSubject,
  get_subject_list,
} from "../../../redux/actions/adminActions";

const SubjectsList = () => {
  const { subjectList } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_subject_list());
  }, []);

  return (
    <div className="pcoded-content">
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            {/* Page-body start */}
            <div className="page-body">
              {/* Row start */}
              <div className="row">
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
                    Subject
                  </strong>
                  <i className="ti-ruler-pencil" /> - Subject List
                </div>
                <div className="col-md-6 col-xl-6">
                  <div className="card m-round">
                    <div className="card-block">
                      <table className="table table-striped">
                        <tbody>
                          <tr className="m-dblue">
                            <td>
                              <b>Subject Name</b>
                            </td>
                            <td>
                              <b>Action</b>
                            </td>
                          </tr>
                          {subjectList?.map((subject, index) => {
                            return (
                              <tr key={index}>
                                <td className="" style={{}}>
                                  {subject.nameOfSubject}
                                </td>
                                <td>
                                  {" "}
                                  <div className="d-flex">
                                    <Link
                                      to={`/admin/edit-subject/${subject._id}`}
                                    >
                                      <button
                                        className="btn btn-xs bg-m-orange"
                                        style={{
                                          padding: 2,
                                          margin: "none",
                                          marginRight: "10px",
                                        }}
                                      >
                                        <i className="ti-pencil m-white" />
                                      </button>
                                    </Link>
                                    <a href="#">
                                      <button
                                        onClick={() =>
                                          dispatch(deleteSubject(subject._id))
                                        }
                                        className="btn btn-xs bg-m-orange"
                                        style={{ padding: 2, margin: "none" }}
                                      >
                                        <i className="ti-trash m-white" />
                                      </button>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link to={`/admin/add-subject`}>
                    <div className="card bg-m-orange order-card m-round">
                      <div className="card-block ">
                        <h6 className="m-b-20" />
                        <h4 className="text-center">
                          <i className="ti-plus" />
                          <br />
                          <span>Add Subject</span>
                        </h4>
                        <p className="m-b-20" />
                      </div>
                    </div>
                  </Link>
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

export default SubjectsList;
