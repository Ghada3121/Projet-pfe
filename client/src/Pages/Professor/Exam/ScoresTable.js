import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add_note } from "../../../redux/actions/professorActions";
const ScoresTable = ({ studentsList, subjectId }) => {
  const [score, setScore] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.value != "undefined") {
      setScore({ ...score, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_note({ score: { ...score, subject: subjectId } }));
  };
  return (
    <div
      className="row"
      style={{ border: "0px solid #9698d6", padding: "5px 5px 5px 15px" }}
    >
      <div className="col-lg-12">
        <h5 className="text-center">Mark Scores</h5>
        <form className=" m-t-10" id="myform">
          <div className="row  justify-content-center">
            <div className="col-lg-6">
              <select
                className="form-control"
                name="student"
                onChange={handleChange}
              >
                <option value={"undefined"}>-----SELECT Student-----</option>
                {studentsList?.map((el, index) => {
                  return (
                    <option value={el._id} key={index}>
                      {el.fullName}
                    </option>
                  );
                })}
              </select>
              <label>Note</label>
              <input
                type="text"
                name="note"
                className="form-control"
                onChange={handleChange}
                placeholder="Note"
              />
            </div>
          </div>

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
        </form>
      </div>
      {/* Row end */}
      {/* Row start */}
      {/* Row end */}
    </div>
  );
};

export default ScoresTable;
