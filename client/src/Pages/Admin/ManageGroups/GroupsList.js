import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteGroup,
  get_group_list,
} from "../../../redux/actions/adminActions";

const GroupList = () => {
  const { groupList } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_group_list());
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
                  }}
                >
                  <strong
                    style={{
                      borderRight: "1px solid #777",
                      paddingRight: 10,
                      marginRight: 10,
                    }}
                  >
                    Groups
                  </strong>
                  <i className="ti-ruler-pencil" /> - All Groups
                </div>
                <div className="row m-t-10 p-l-10 w-100">
                  {groupList?.map((el, index) => {
                    return (
                      <div
                        key={index}
                        className="col-md-6 col-xl-3 p-l-10 p-b-10 p-t-10"
                      >
                        <div className="bg-m-white m-round">
                          <div className="">
                            <h6
                              className="m-b-20 text-gray f-16"
                              style={{ cursor: "pointer" }}
                            >
                              {el.nameOfGroup}
                              <i
                                className="ti-trash f-right delete-btn"
                                onClick={() => dispatch(deleteGroup(el._id))}
                                style={{
                                  borderBottom: "2px solid #fc5185",
                                  marginLeft: 10,
                                }}
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Delete"
                              />{" "}
                              <Link to={`/admin/edit-group/${el._id}`}>
                                <i
                                  className="ti-pencil f-right text-blue"
                                  style={{ borderBottom: "2px solid #3144de" }}
                                  data-toggle="tooltip"
                                  title=""
                                  data-original-title="Edit"
                                />
                              </Link>
                            </h6>
                            <Link href="#">
                              <h2 className="text-left text-dark">
                                <i className="fa fa-graduation-cap f-right text-blue" />
                                <span>{el.studentsNumber}</span>
                                <span className="text-gray f-14 m-l-10">
                                  STUDENTS
                                </span>
                              </h2>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="col-md-6 col-xl-3">
                    <Link to="/admin/add-group">
                      <div
                        className="card order-card m-round"
                        style={{
                          border: "2px dotted #3144de",
                          color: "#3144de",
                        }}
                      >
                        <div className="card-block ">
                          <h4 className="text-center f-14">
                            <i className="ti-plus" />
                            <br />
                            <span>Add New</span>
                          </h4>
                          <p className="m-b-20" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* Row end */}
              </div>
              {/* Page-body end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
