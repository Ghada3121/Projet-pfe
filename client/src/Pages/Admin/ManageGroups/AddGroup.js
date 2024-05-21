import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import upload, { errorToast } from "../../../utils";
import { addGroup } from "../../../redux/actions/adminActions";
import ClipLoader from "react-spinners/ClipLoader";
const AddGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState({});
  const [file, setFile] = useState();
  const { loading } = useSelector((state) => state.adminReducer);
  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value.trim() });
  };
  const handleAddGroup = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    if (file !== undefined) {
      dispatch(
        addGroup({ groupData: { ...groupData, groupRoutine: url }, navigate })
      );
    } else {
      errorToast("must add timeTable ");
    }
  };
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
                  Groups
                </strong>
                <i className="ti-ruler-pencil" /> - Add Group
              </div>
              <div className="col-md-6 col-xl-4" />
              <div className="col-md-6 col-xl-4 text-center">
                <form id="myform">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name Of Group"
                    id="classname"
                    name="nameOfGroup"
                    onChange={handleChange}
                    required=""
                  />

                  <br />
                  <div className="m-div">
                    <label className="m-label bg-gradient-gray m-white">
                      TimeTable
                    </label>
                    <input
                      type="file"
                      className="form-control m-field"
                      onChange={(e) => setFile(e.target.files[0])}
                      name="fileToUpload"
                      id="fileToUpload"
                    />
                  </div>
                  <br />
                  <button
                    type="submit"
                    name="addGroup"
                    className="btn btn-primary btn-large"
                    onClick={handleAddGroup}
                  >
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      <>
                        <i className="ti-check" /> Submit
                      </>
                    )}
                  </button>
                  <br />
                </form>
              </div>
              <div className="col-md-6 col-xl-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
