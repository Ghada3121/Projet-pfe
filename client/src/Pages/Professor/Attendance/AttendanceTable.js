import React from "react";
import { add_absences } from "../../../redux/actions/professorActions";
import { useDispatch } from "react-redux";

const AttendanceTable = ({
  studentsList,
  setAbsences,
  absences,
  subjectId,
  groupId,
  verifyAbsence,
}) => {
  const dispatch = useDispatch();
  const handleAddStudentAbsence = (student) => {
    const isStudentAdded = absences.some(
      (absence) => absence.studentId === student._id
    );
    if (!isStudentAdded) {
      setAbsences((prevState) => [
        ...prevState,
        { studentId: student._id, subjectId, groupId },
      ]);
    }
  };
  const handleRemoveStudentAbsence = (student) => {
    setAbsences(absences.filter((el) => el.studentId !== student._id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_absences({ absences }));
  };
  // Get current date and time
  const currentDate = new Date();
  const currentDay = currentDate.toISOString().slice(0, 10); // Extract current date
  const currentHour = `${currentDate.getHours()}`; // Extract current hour and minute

  // Function to filter absences based on current day and hour
  const filteredAbsences = verifyAbsence.filter((absence) => {
    const createdAt = new Date(absence.createdAt);
    const formattedDate = createdAt.toISOString().slice(0, 10); // Extract date part
    const formattedTime = `${createdAt.getHours()}`; // Extract hour and minute part
    return formattedDate === currentDay && formattedTime === currentHour;
  });
  return (
    <div
      className="row attendance-table"
      style={{ border: "0px solid #9698d6", padding: "5px 5px 5px 15px" }}
    >
      <div className="col-lg-12">
        <h5 className="text-center">Mark Attendance</h5>
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
                <td>
                  <b>Status</b>
                </td>
              </tr>
              {verifyAbsence == undefined || filteredAbsences.length == 0 ? (
                studentsList?.map((student, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span>{index + 1}</span>
                      </td>
                      <td id="desktop1">
                        <img
                          src={student.avatar}
                          className="img-circle"
                          style={{ width: 30, height: 30 }}
                        />
                      </td>
                      <td>
                        <span>{student.fullName}</span>
                      </td>
                      <td id="desktop1">
                        <span>{student.groups.nameOfGroup}</span>
                      </td>
                      <td style={{ width: 100 }}>
                        <input
                          type="radio"
                          name={`s${index}`}
                          defaultValue="P"
                          id={`P${index}`}
                          onChange={() => handleRemoveStudentAbsence(student)}
                          className="present"
                          defaultChecked=""
                        />
                        <label htmlFor={`P${index}`}>P</label>

                        <input
                          type="radio"
                          name={`s${index}`}
                          defaultValue="A"
                          id={`A${index}`}
                          className="absent"
                          onChange={() => handleAddStudentAbsence(student)}
                        />
                        <label htmlFor={`A${index}`}>A</label>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    Absence For This Group & subject are saved at this time !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {verifyAbsence == undefined || filteredAbsences.length == 0 ? (
            <h6 className="w-100 text-center p-30">
              <button
                type="submit"
                id="submitBtn"
                name="classattsheet"
                className="submit btn btn-danger"
                onClick={handleSubmit}
              >
                <i className="ti-check" /> Submit
              </button>
            </h6>
          ) : null}
        </form>
      </div>
      {/* Row end */}
      {/* Row start */}
      {/* Row end */}
    </div>
  );
};

export default AttendanceTable;
