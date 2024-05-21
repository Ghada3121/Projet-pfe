import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_exam_date } from "../../../redux/actions/professorActions";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
const AddExamDate = () => {
  const { user } = useSelector((state) => state.LoginReducer);
  const { loading } = useSelector((state) => state.professorReducer);
  const [examDate, setExamDate] = useState();
  const [groupList, setGroupList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleChange = (e) => {
    setExamDate({ ...examDate, [e.target.name]: e.target.value });
  };
  const handleAddExamDate = (e) => {
    e.preventDefault();
    dispatch(
      add_exam_date({ examDate: { ...examDate, EventTo: groupList }, navigate })
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
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    onChange={handleChange}
                  />
                  <label>Start Date</label>
                  <input
                    type="text"
                    name="cn"
                    style={{ visibility: "hidden" }}
                  />
                  <br />
                  <input
                    type="datetime-local"
                    onChange={handleChange}
                    name="start_date"
                    className="form-control"
                    required=""
                  />
                  <label>End Date</label>
                  <input
                    type="text"
                    name="cn"
                    style={{ visibility: "hidden" }}
                  />
                  <br />
                  <input
                    type="datetime-local"
                    onChange={handleChange}
                    name="end_date"
                    className="form-control"
                    required=""
                  />
                  <br />
                  <select
                    name="subject"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value={"undefined"}>
                      -----SELECT SUBJECTS Exam -----
                    </option>
                    {user?.subjects?.map((subject, index) => {
                      return (
                        <option
                          value={subject.subject.nameOfSubject}
                          key={index}
                        >
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
                    onClick={handleAddExamDate}
                  >
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      <>
                        <i className="ti-check" /> Create
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

export default AddExamDate;
