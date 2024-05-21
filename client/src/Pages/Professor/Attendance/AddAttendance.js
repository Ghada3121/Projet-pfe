import React, { useEffect, useState } from "react";
import AttendanceTable from "./AttendanceTable";
import { useDispatch, useSelector } from "react-redux";
import {
  get_class_Students,
  get_class_teach,
  get_subject_teach,
  verify_absences,
} from "../../../redux/actions/professorActions";
import ClipLoader from "react-spinners/ClipLoader";
import { errorToast } from "../../../utils";
export const AddAttendance = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groupId, setGroupId] = useState();
  const [subjectId, setSubjectId] = useState();
  const [absences, setAbsences] = useState([]);
  const { user } = useSelector((state) => state.LoginReducer);
  const { classToTeach, studentsList, subjects, verifyAbsence } = useSelector(
    (state) => state.professorReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_class_teach());
    dispatch(get_subject_teach());
  }, []);
  useEffect(() => {
    dispatch(verify_absences({ subjectId, groupId, userId: user._id }));
  }, [subjectId, groupId]);

  const handleSelectClass = (e) => {
    e.preventDefault();

    if (subjectId == "undefined" && groupId == "undefined") {
      errorToast("Select both Group & Subject");
    } else {
      setLoading(true);
      dispatch(get_class_Students({ groupId, setLoading, setShow }));
    }
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
              <div className="col" />
              <div className="col-md-6 col-xl-6 col-sm-12 text-center">
                <h6 className="m-gray p-10"> Mark Manual Attendance</h6>
                <form id="myform">
                  <div className="row">
                    <div className="col-lg-6">
                      <select
                        name="class"
                        className="form-control"
                        onChange={(e) => setGroupId(e.target.value)}
                      >
                        <option value={"undefined"}>
                          -----SELECT CLASS-----
                        </option>
                        {classToTeach?.map((el, index) => {
                          return (
                            <option value={el.group._id} key={index}>
                              {el.group.nameOfGroup}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <select
                        name="class"
                        className="form-control"
                        onChange={(e) => setSubjectId(e.target.value)}
                      >
                        <option value={"undefined"}>
                          -----SELECT Subject-----
                        </option>
                        {subjects?.map((el, index) => {
                          return (
                            <option value={el.subject._id} key={index}>
                              {el.subject.nameOfSubject}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <br style={{ margin: 20 }} />
                  <button
                    type="submit"
                    name="classbutton"
                    className="submit btn btn-primary"
                    onClick={handleSelectClass}
                  >
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      <>
                        <i className="ti-search" /> Search
                      </>
                    )}
                  </button>
                </form>
                <hr
                  style={{
                    margin: 50,
                    height: 2,
                    border: "none",
                    color: "#333",
                    backgroundColor: "#333",
                  }}
                />
              </div>
              <div className="col" />
              {/* Row end */}
              {/* Row start */}
              {/* Row end */}
            </div>
            {show ? (
              <AttendanceTable
                studentsList={studentsList}
                absences={absences}
                setAbsences={setAbsences}
                subjectId={subjectId}
                groupId={groupId}
                verifyAbsence={verifyAbsence}
              />
            ) : null}
            {/* Page-body end */}
          </div>
        </div>
      </div>
    </div>
  );
};
