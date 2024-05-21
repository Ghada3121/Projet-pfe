import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_student_exam_date } from "../../../redux/actions/studentActions";

const ExamDates = () => {
  const { examDate } = useSelector((state) => state.studentReducer);
  const { user } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user !== undefined) {
      dispatch(get_student_exam_date(user.groups));
    }
  }, [user]);
  return (
    <div className="pcoded-inner-content">
      <div className="main-body">
        <div className="page-wrapper">
          {/* Page-body start */}
          <div className="page-body">
            <div
              className="row attendance-table"
              style={{
                border: "0px solid #9698d6",
                padding: "5px 5px 5px 15px",
              }}
            >
              <div className="col-lg-12">
                <h5 className="text-center">Student Exam Date List</h5>
                <form className=" m-t-10" id="myform">
                  <table
                    className="table-striped center m-gray"
                    style={{ margin: "0 auto", width: "80%" }}
                    cellPadding="10px"
                  >
                    <tbody>
                      <tr className="bg-m-dblue m-white">
                        <td>
                          <b>ID</b>
                        </td>
                        <td id="desktop1">
                          <b>Professor</b>
                        </td>

                        <td id="desktop1">
                          <b>Subject Name</b>
                        </td>
                        <td id="desktop1">
                          <b>Start Time</b>
                        </td>
                        <td id="desktop1">
                          <b>End Time</b>
                        </td>
                      </tr>
                      {examDate !== undefined && examDate?.length !== 0 ? (
                        examDate?.map((exam, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <span>{index + 1}</span>
                              </td>

                              <td>
                                <span>{exam.addedBy.fullName}</span>
                              </td>

                              <td id="desktop1">
                                <span>{exam.description}</span>
                              </td>
                              <td id="desktop1">
                                <span>{`${exam.start_date.slice(
                                  0,
                                  10
                                )}-${exam.start_date.slice(11, 16)}`}</span>
                              </td>
                              <td id="desktop1">
                                <span>{`${exam.end_date.slice(
                                  0,
                                  10
                                )}-${exam.end_date.slice(11, 16)}`}</span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            No Exam Date Saved Yet !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </form>
              </div>
              {/* Row end */}
              {/* Row start */}
              {/* Row end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDates;
