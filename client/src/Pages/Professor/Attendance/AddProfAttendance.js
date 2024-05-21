import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { add_prof_absence } from "../../../redux/actions/professorActions";
import { LOADING } from "../../../redux/constants/actions-types";

const AddProfAttendance = () => {
  const { loading } = useSelector((state) => state.adminReducer);
  const { user } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [absenceDetails, setAbsenceDetails] = useState({});
  const [groupToTeach, setGroupToTeach] = useState([]);
  const handleAddGroupToTeach = (event) => {
    const groupId = event.target.value;
    const groupName = event.target.options[event.target.selectedIndex].text;
    const existGroup = groupToTeach.some((el) => el.group === groupId);
    if (!existGroup) {
      setGroupToTeach((prevSelectedGroups) => [
        ...prevSelectedGroups,
        { group: groupId, name: groupName },
      ]);
    }
  };
  const removeGroup = (id) => {
    setGroupToTeach(groupToTeach.filter((el) => el.group !== id));
  };

  const handleChange = (e) => {
    setAbsenceDetails({ ...absenceDetails, [e.target.name]: e.target.value });
  };
  const handleAddAbsence = () => {
    dispatch({ type: LOADING });
    dispatch(
      add_prof_absence({
        absenceDetails: { ...absenceDetails, EventTo: groupToTeach },
        navigate,
      })
    );
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
                  Attendance
                </strong>
                <i className="ti-home" /> - Add My Attendance
              </div>
              <div className="bg-m-white m-t-20" style={{ borderRadius: 10 }}>
                <div className="row ">
                  <h3 className="text-center m-t-20 w-100">
                    Add Absence
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
                    Attendance Information{" "}
                    <span style={{ fontSize: 12 }} className="f-right" />
                  </h6>
                  <div className="col-lg-12">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Select Class*
                      </label>
                      <select
                        className="form-control m-field"
                        onChange={handleAddGroupToTeach}
                      >
                        <option> --select class-- </option>
                        {user?.classToTeach?.map((el, index) => {
                          return (
                            <option value={el.group._id} key={index}>
                              {el.group.nameOfGroup}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="elements">
                      {groupToTeach.map((el, index) => {
                        return (
                          <span
                            className="block-element"
                            key={index}
                            onClick={() => removeGroup(el.group)}
                          >
                            <i className="ti-close" />
                            {el.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Start Date*
                      </label>
                      <input
                        type="date"
                        className="form-control m-field"
                        placeholder="your date"
                        onChange={handleChange}
                        name="start_date"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        end Date*
                      </label>
                      <input
                        type="date"
                        className="form-control m-field"
                        placeholder="your Date"
                        onChange={handleChange}
                        name="end_date"
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
                      name="submit"
                      onClick={handleAddAbsence}
                    >
                      {loading ? (
                        <ClipLoader color="#fff" size={20} />
                      ) : (
                        <>
                          <i className="ti-check" /> Submit
                        </>
                      )}
                    </button>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfAttendance;
