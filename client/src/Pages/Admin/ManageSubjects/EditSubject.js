import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { errorToast } from "../../../utils";
import {
  get_subject_list,
  updateSubject,
} from "../../../redux/actions/adminActions";

const EditSubject = () => {
  const { loading, subjectList } = useSelector((state) => state.adminReducer);
  const { id } = useParams();
  const [nameOfSubject, setNameOfSubject] = useState();
  useEffect(() => {
    dispatch(get_subject_list());
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editGroup = async (e) => {
    e.preventDefault();
    if (nameOfSubject !== undefined) {
      dispatch(updateSubject({ nameOfSubject, id, navigate }));
    } else {
      errorToast("subject name must be valid");
    }
  };
  const findSubject = subjectList?.find((el) => el._id === id);
  return (
    <div className="pcoded-inner-content" style={{ marginLeft: "115px" }}>
      <div className="main-body">
        <div className="page-wrapper">
          {/* Page-body start */}
          <div className="page-body">
            {/* Row start */}

            <div className="row">
              <div
                className="col-12 p-10 f-14"
                style={{
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0px 0px 1px 0px gray",
                  marginBottom: "20px",
                }}
              >
                <strong
                  style={{
                    borderRight: "1px solid #777",
                    paddingRight: 10,
                    marginRight: 10,
                  }}
                >
                  Subject
                </strong>
                <i className="ti-ruler-pencil" /> - Edit Subject
              </div>
              <div className="col-md-6 col-xl-4" />
              <div className="col-md-6 col-xl-4 text-center">
                <form id="myform">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={findSubject?.nameOfSubject}
                    placeholder="Name Of subject"
                    onChange={(e) => setNameOfSubject(e.target.value)}
                    id="classname"
                    name="classname"
                    required=""
                  />

                  <br />

                  <button
                    type="submit"
                    className="btn btn-primary btn-large"
                    onClick={editGroup}
                  >
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      <>
                        <i className="ti-check" /> Edit
                      </>
                    )}
                  </button>
                  <br />
                </form>
              </div>
              <div className="col-md-6 col-xl-4" />
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

export default EditSubject;
