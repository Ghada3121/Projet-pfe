import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_student_absence } from "../../redux/actions/studentActions";

const Attendance = () => {
  const { absences } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_student_absence());
  }, []);
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
                <h5 className="text-center">Student Absence List</h5>
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
                          <b>Photo</b>
                        </td>
                        <td>
                          <b>Student Name</b>
                        </td>
                        <td id="desktop1">
                          <b>Group Name</b>
                        </td>
                        <td id="desktop1">
                          <b>Subject Name</b>
                        </td>
                        <td id="desktop1">
                          <b>Time</b>
                        </td>
                        <td>
                          <b>Status</b>
                        </td>
                      </tr>
                      {absences !== undefined && absences?.length !== 0 ? (
                        absences?.map((absence, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <span>{index + 1}</span>
                              </td>
                              <td id="desktop1">
                                <img
                                  src={absence.student.avatar}
                                  className="img-circle"
                                  style={{ width: 30, height: 30 }}
                                />
                              </td>
                              <td>
                                <span>{absence.student.fullName}</span>
                              </td>
                              <td id="desktop1">
                                <span>{absence.group.nameOfGroup}</span>
                              </td>
                              <td id="desktop1">
                                <span>{absence.subject.nameOfSubject}</span>
                              </td>
                              <td id="desktop1">
                                <span>{`${absence.createdAt.slice(
                                  0,
                                  10
                                )}-${absence.createdAt.slice(11, 16)}`}</span>
                              </td>
                              <td style={{ width: 100 }}>
                                <span>{absence.situation}</span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center">
                            No Absence Saved Yet !
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

export default Attendance;
