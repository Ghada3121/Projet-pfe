import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import upload from "../../../utils";
import { add_course } from "../../../redux/actions/professorActions";
import { LOADING } from "../../../redux/constants/actions-types";

export const AddCourse = () => {
  const { loading } = useSelector((state) => state.professorReducer);
  const { user } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [groupList, setGroupList] = useState([]);
  const handleAddGroup = (e) => {
    if (e.target.value !== "undefined") {
      let existGroup = groupList.some((el) => el == e.target.value);
      if (!existGroup) {
        setGroupList([...groupList, e.target.value]);
      }
    }
  };
  const handleRemoveGroup = (e) => {
    setGroupList(groupList.filter((el) => el !== e));
  };
  const [courseDetails, setCourseDetails] = useState();
  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };
  const handleAddCourse = async (e) => {
    e.preventDefault();
    dispatch({ type: LOADING });
    const url = await upload(file);
    dispatch(
      add_course({
        courseDetails: { ...courseDetails, groups: groupList, courseFile: url },
        navigate,
      })
    );
  };
  return (
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
              <div className="col-lg-4" />
              <div className="col-lg-4 text-center m-t-40">
                <form id="myform">
                  <input
                    type="text"
                    name="courseTitle"
                    className="form-control"
                    placeholder="Title"
                    onChange={handleChange}
                  />
                  <br />

                  <input
                    type="file"
                    name="courseFile"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control"
                  />
                  <br />

                  <textarea
                    type="text"
                    className="form-control m-field"
                    placeholder="your description"
                    onChange={handleChange}
                    name="courseDetails"
                    required=""
                  />

                  <br />
                  <select
                    name="semestre"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value={"undefined"}>
                      -----SELECT Semestre -----
                    </option>
                    <option value={1}>Semestre 1</option>
                    <option value={2}>Semestre 2</option>
                  </select>
                  <br />
                  <select
                    name="subject"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value={"undefined"}>
                      -----SELECT SUBJECTS -----
                    </option>
                    {user?.subjects?.map((subject, index) => {
                      return (
                        <option value={subject.subject._id} key={index}>
                          {subject.subject.nameOfSubject}
                        </option>
                      );
                    })}
                  </select>
                  <br />
                  <select
                    name="subject"
                    className="form-control"
                    onChange={handleAddGroup}
                  >
                    <option value={"undefined"}>-----SELECT Groups-----</option>
                    {user?.classToTeach?.map((classToTeach, index) => {
                      return (
                        <option value={classToTeach.group._id} key={index}>
                          {classToTeach.group.nameOfGroup}
                        </option>
                      );
                    })}
                  </select>
                  <div className="elements">
                    {groupList.map((el, index) => {
                      return (
                        <span
                          key={index}
                          className="block-element"
                          onClick={() => handleRemoveGroup(el)}
                        >
                          <i className="ti-close" />{" "}
                          {
                            user.classToTeach.find((e) => e.group._id == el)
                              .group.nameOfGroup
                          }
                        </span>
                      );
                    })}
                  </div>

                  <br style={{ margin: 10 }} />
                  <button
                    type="submit"
                    className="submit btn btn-danger"
                    onClick={handleAddCourse}
                  >
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      <>
                        <i className="ti-check" /> Create Course
                      </>
                    )}
                  </button>
                </form>
              </div>
              <div className="col-lg-4" />
            </div>
            {/* Row end */}
            {/* Row start */}
            {/* Row end */}
          </div>
          {/* Page-body end */}
        </div>
      </div>
    </div>
  );
};
