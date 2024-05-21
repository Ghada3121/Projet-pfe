import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProfessor,
  get_group_list,
  get_subject_list,
} from "../../../redux/actions/adminActions";
import upload from "../../../utils";
import ClipLoader from "react-spinners/ClipLoader";

const AddProfessor = () => {
  const { loading, groupList, subjectList } = useSelector(
    (state) => state.adminReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(get_group_list());
    dispatch(get_subject_list());
  }, []);

  const [file, setFile] = useState();
  const [routineFile, setRoutineFile] = useState();

  const [professorDetails, setProfessorDetails] = useState({});

  const [groupToTeach, setGroupToTeach] = useState([]);
  const [subjectToTeach, setSubjectToTeach] = useState([]);

  const handleChange = (e) => {
    setProfessorDetails({
      ...professorDetails,
      [e.target.name]: e.target.value,
    });
  };

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
  const handleAddSubjectToTeach = (event) => {
    const subjectId = event.target.value;
    const subjectName = event.target.options[event.target.selectedIndex].text;
    const existSubject = subjectToTeach.some((el) => el.subject === subjectId);
    if (!existSubject) {
      setSubjectToTeach((prevSelectedGroups) => [
        ...prevSelectedGroups,
        { subject: subjectId, name: subjectName },
      ]);
    }
  };

  const removeSubject = (id) => {
    setSubjectToTeach(subjectToTeach.filter((el) => el.subject !== id));
  };
  const removeGroup = (id) => {
    setGroupToTeach(groupToTeach.filter((el) => el.group !== id));
  };

  const handleAddProfessor = async (e) => {
    e.preventDefault();

    if (routineFile !== undefined) {
      const routineUrl = await upload(routineFile);
      if (file == undefined) {
        dispatch(
          addProfessor({
            professorDetails: {
              ...professorDetails,
              classToTeach: groupToTeach,
              subjects: subjectToTeach,
              profRoutine: routineUrl,
            },
            navigate,
          })
        );
      } else {
        const url = await upload(file);
        dispatch(
          addProfessor({
            professorDetails: {
              ...professorDetails,
              avatar: url,
              profRoutine: routineUrl,
              classToTeach: groupToTeach,
              subjects: subjectToTeach,
            },
            navigate,
          })
        );
      }
    } else {
      dispatch(
        addProfessor({
          professorDetails: {
            ...professorDetails,
            classToTeach: groupToTeach,
            subjects: subjectToTeach,
          },
          navigate,
        })
      );
    }
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
                  Professor
                </strong>
                <i className="ti-home" /> - Admission Form
              </div>
              <div className="bg-m-white m-t-20" style={{ borderRadius: 10 }}>
                <div className="row ">
                  <h3 className="text-center m-t-20 w-100">
                    Admission Form
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
                    Professor Information{" "}
                    <span style={{ fontSize: 12 }} className="f-right" />
                  </h6>
                  <div className="col-lg-4">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Professor Name*
                      </label>
                      <input
                        type="text"
                        className="form-control m-field"
                        placeholder="Name of Professor"
                        onChange={handleChange}
                        name="fullName"
                        required=""
                      />
                    </div>
                    <div className="m-div">
                      <label className="m-label bg-gradient-gray m-white">
                        Picture - Optional
                      </label>
                      <input
                        type="file"
                        className="form-control m-field"
                        name="fileToUpload"
                        id="fileToUpload"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Phone Number*
                      </label>
                      <input
                        type="number"
                        className="form-control m-field"
                        placeholder="+(216) 23 456 789"
                        onChange={handleChange}
                        name="phoneNumber"
                        required=""
                      />
                    </div>
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Select Class*
                      </label>
                      <select
                        className="form-control m-field"
                        onChange={handleAddGroupToTeach}
                      >
                        <option value=""> --select class-- </option>
                        {groupList?.map((el, index) => {
                          return (
                            <option value={el._id} key={index}>
                              {el.nameOfGroup}
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

                  <div className="col-lg-4">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Email:
                      </label>
                      <input
                        type="text"
                        className="form-control m-field"
                        placeholder="Email"
                        id="reg"
                        name="email"
                        onChange={handleChange}
                        required=""
                      />
                    </div>

                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Address*
                      </label>
                      <input
                        type="text"
                        className="form-control m-field"
                        placeholder="Address"
                        name="address"
                        onChange={handleChange}
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Select Subjects*
                      </label>
                      <select
                        className="form-control m-field"
                        onChange={handleAddSubjectToTeach}
                      >
                        <option value=""> --select Subjects-- </option>
                        {subjectList?.map((el, index) => {
                          return (
                            <option value={el._id} key={index}>
                              {el.nameOfSubject}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="elements">
                      {subjectToTeach.map((el, index) => {
                        return (
                          <span
                            className="block-element"
                            key={index}
                            onClick={() => removeSubject(el.subject)}
                          >
                            <i className="ti-close" />
                            {el.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="m-div">
                      <label className="m-label bg-gradient-blue m-white">
                        Professor Routine *
                      </label>
                      <input
                        type="file"
                        className="form-control m-field"
                        name="fileToUpload"
                        id="fileToUpload"
                        onChange={(e) => setRoutineFile(e.target.files[0])}
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
                      onClick={handleAddProfessor}
                    >
                      {loading ? (
                        <ClipLoader color="#fff" size={20} />
                      ) : (
                        <>
                          {" "}
                          <i className="ti-check" /> Submit
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

export default AddProfessor;
