import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteEvent,
  get_event_list,
} from "../../../redux/actions/adminActions";
const EventsList = () => {
  const { eventList } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();
  useEffect(() => {
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
                    Events
                  </strong>
                  <i className="ti-ruler-pencil" /> - Events List
                  <Link
                    to={`/admin/add-event`}
                    className="f-right m-r-10"
                    data-toggle="tooltip"
                    title=""
                  >
                    <button
                      className="btn btn-sm bg-gradient-red m-white m-round"
                      style={{ opacity: "0.8" }}
                    >
                      <i className="ti-plus" /> Add Event
                    </button>
                  </Link>
                </div>
                <div className="col-md-12 col-xl-12">
                  <div className="card m-round">
                    <div className="card-block">
                      <table className="table table-striped">
                        <tbody>
                          <tr className="m-dblue">
                            <td>
                              <b>Event Title</b>
                            </td>
                            <td>
                              <b>Description</b>
                            </td>
                            <td>
                              <b>Action</b>
                            </td>
                          </tr>
                          {eventList?.map((event, index) => {
                            return (
                              <tr key={index}>
                                <td className="">{event.title}</td>
                                <td className="">{event.description}</td>
                                <td>
                                  {" "}
                                  <div className="d-flex">
                                    <Link to={`/admin/edit-event/${event._id}`}>
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
                                    <button
                                      className="btn btn-xs bg-m-orange"
                                      style={{ padding: 2, margin: "none" }}
                                      onClick={() =>
                                        dispatch(deleteEvent(event._id))
                                      }
                                    >
                                      <i className="ti-trash m-white" />
                                    </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
