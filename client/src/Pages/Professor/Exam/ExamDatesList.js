import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_exam_date } from "../../../redux/actions/professorActions";

const ExamDatesList = () => {
  const { examDateList } = useSelector((state) => state.professorReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_exam_date());
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
                <h5 className="text-center">Exam Date List</h5>
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
                          <b>Exam Title</b>
                        </td>

                        <td id="desktop1">
                          <b>Group Name</b>
                        </td>
                        <td id="desktop1">
                          <b>Subject Name</b>
                        </td>
                        <td id="desktop1">
                          <b>Start Date</b>
                        </td>
                        <td>
                          <b>End Date</b>
                        </td>
                      </tr>
                      {examDateList !== undefined ? (
                        examDateList?.map((exam, index) => {
                          console.log(exam);
                          return (
                            <tr key={index}>
                              <td>
                                <span>{index + 1}</span>
                              </td>
                              <td id="desktop1">
                                <span>{exam.title}</span>
                              </td>

                              <td id="desktop1">
                                <span>
                                  {exam.EventTo.map((el) => el.nameOfGroup)}
                                </span>
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
                            No Exam Date Added Yet !
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

export default ExamDatesList;
