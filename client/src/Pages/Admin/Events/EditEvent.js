import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_event_list,
  updateEvent,
} from "../../../redux/actions/adminActions";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const EditEvent = () => {
  const { loading, eventList } = useSelector((state) => state.adminReducer);
  const [eventDetails, setEventDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(get_event_list());
  }, []);
  useEffect(() => {
    if (eventList !== undefined) {
      setEventDetails(eventList.find((el) => el._id === id));
    }
  }, [eventList]);
  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    dispatch(updateEvent({ eventDetails, id, navigate }));
  };
  return (
    <div className="pcoded-content">
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            {/* Page-body start */}
            <div className="page-body ">
              {/* Row start */}
              <div
                className="col-12 p-10 f-16"
                style={{ borderRadius: 10, background: "#fff" }}
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
                <i className="ti-home" /> - Edit Event
              </div>
              <div className="bg-m-white m-t-20" style={{ borderRadius: 10 }}>
                <div className="row ">
                  <h3 className="text-center m-t-20 w-100">
                    Edit Event
                    <br />
                    <div
                      className="bg-gradient-blue "
                      style={{
                        width: 20,
                        height: 7,
                        borderRadius: 10,
                        display: "inline-block",
                      }}
                    />{" "}
                    <span
                      className="f-12 m-dblue"
                      style={{ display: "inline-block", fontWeight: 100 }}
                    >
                      Required*
                    </span>
                    <div
                      className="bg-gradient-gray m-l-10"
                      style={{
                        width: 20,
                        height: 7,
                        borderRadius: 10,
                        display: "inline-block",
                      }}
                    />{" "}
                    <span
                      className="f-12 gradient-gray"
                      style={{ display: "inline-block", fontWeight: 100 }}
                    >
                      Optional
                    </span>
                  </h3>
                  <form id="myform"></form>
                </div>
                <div
                  className="row"
                  style={{
                    border: "0px solid #9698d6",
                    padding: "5px 5px 5px 15px",
                  }}
                >
                  <h6
                    className="w-100"
                    style={{ borderBottom: "1px solid #999" }}
                  >
                    <div
                      className="bg-gradient-dark m-white"
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        display: "inline-block",
                        paddingTop: 3,
                        paddingLeft: 7,
                      }}
                    >
                      1
                    </div>{" "}
                    Event Information{" "}
                    <span style={{ fontSize: 12 }} className="f-right" />
                  </h6>
                  <div className="col-lg-12">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Title*
                      </label>
                      <input
                        type="text"
                        className="form-control m-field"
                        placeholder="Event Title"
                        name="title"
                        defaultValue={eventDetails?.title}
                        onChange={handleChange}
                        required=""
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Description*
                      </label>
                      <textarea
                        type="text"
                        className="form-control m-field"
                        placeholder="your description"
                        defaultValue={eventDetails?.description}
                        name="description"
                        onChange={handleChange}
                        required=""
                      />
                    </div>
                  </div>
                </div>

                <hr />
                <div className="row" style={{ padding: "5px 5px 5px 15px" }}>
                  <h5 className="w-100 text-center">
                    <button
                      className="btn btn-large bg-m-dblue m-white"
                      style={{ width: 170, padding: 10, borderRadius: 20 }}
                      type="submit"
                      id="submitBtn"
                      onClick={handleEditEvent}
                      name="submit"
                    >
                      {loading ? (
                        <ClipLoader color="#fff" size={20} />
                      ) : (
                        <>
                          <i className="ti-check" /> Update
                        </>
                      )}
                    </button>
                  </h5>
                </div>
                {/* Row end */}
                {/* Row start */}
                {/* Row end */}
                {/* Page-body end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;