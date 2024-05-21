import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_course } from "../../../redux/actions/professorActions";

const CoursesList = () => {
  const { courseList } = useSelector((state) => state.professorReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_course());
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
                <h5 className="text-center">Course List</h5>

                <div className="courses">
                  {courseList?.map((course, index) => {
                    return (
                      <div className="course-item" key={index}>
                        <a
                          href={course.courseFile}
                          target="_blank"
                          className="attachment-box ripple-effect"
                        >
                          <span>Title : {course.courseTitle}</span>
                          <span>Description : {course.courseDetails}</span>
                          <span>
                            Group : {course.groups.map((el) => el.nameOfGroup)}
                          </span>
                          <span>Subject : {course.subject.nameOfSubject}</span>
                        </a>
                      </div>
                    );
                  })}
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

export default CoursesList;
