import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_student_group } from "../../redux/actions/studentActions";

const ClassRoutine = () => {
  const { user } = useSelector((state) => state.LoginReducer);
  const { studentGroup } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== undefined) {
      dispatch(get_student_group(user.groups));
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
                <h5 className="text-center">{`Class Routine ${studentGroup?.nameOfGroup}`}</h5>

                <div className="d-flex justify-content-center m-20">
                  <img src={studentGroup?.groupRoutine} alt="" />
                </div>
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

export default ClassRoutine;
