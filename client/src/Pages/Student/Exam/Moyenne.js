import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_student_exam_scores } from "../../../redux/actions/studentActions";

const Moyenne = () => {
  const { user } = useSelector((state) => state.LoginReducer);
  const { examScores } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_student_exam_scores());
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
                <h5 className="text-center">Student Average</h5>
                <form className=" m-t-10" id="myform">
                  <table
                    className="table-striped center m-gray"
                    style={{ margin: "0 auto", width: "80%" }}
                    cellPadding="10px"
                  >
                    <tbody>
                      <tr className="bg-m-dblue m-white">
                        <td id="desktop1">
                          <b>Student</b>
                        </td>
                        <td id="desktop1">
                          <b>Moyenne</b>
                        </td>
                      </tr>

                      <tr>
                        <td>{user.fullName}</td>
                        <td>
                          <span>
                            {examScores.reduce(
                              (acc, curr) => acc + curr.note,
                              0
                            ) / examScores.length}
                          </span>
                        </td>

                        <td id="desktop1">
                          <span> </span>
                        </td>
                      </tr>
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

export default Moyenne;
