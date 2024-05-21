import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
const Dashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Students",
        data: [100, 1000, 700, 500, 600, 1200, 505],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Professor",
        data: [1010, 1200, 1500, 1400, 1300, 1500, 1505],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="pcoded-content">
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                {/* order-card start */}
                <div className="col-md-6 col-xl-3">
                  <Link href="#">
                    <div className="card bg-m-dblue order-card m-round">
                      <div className="card-block ">
                        <h6 className="m-b-20">Total Students</h6>
                        <h2 className="text-right">
                          <i className="ti-user f-left" />
                          <span>3</span>
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link href="#">
                    <div className="card bg-m-gray m-round order-card">
                      <div className="card-block">
                        <h6 className="m-b-20">Professor</h6>
                        <h2 className="text-right">
                          <i className="ti-briefcase f-left" />
                          <span>2</span>
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link href="#">
                    <div className="card bg-m-orange m-round order-card">
                      <div className="card-block">
                        <h6 className="m-b-20">Classes</h6>
                        <h2 className="text-right">
                          <i className="ti-ruler-pencil f-left" />

                          <span>0</span>
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link href="#">
                    <div className="card bg-m-blue1 m-round order-card">
                      <div className="card-block">
                        <h6 className="m-b-20">Subjects</h6>
                        <h2 className="text-right">
                          <i className="ti-book f-left" />

                          <span>0</span>
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* order-card end */}
                {/* statustic and process start */}
                <div className="col-lg-8 col-md-12">
                  <div className="m-main row">
                    <div className="m-container order-card">
                      <img
                        src="https://eskooly.com/bb/assets/images/admin-message.png"
                        className="img-1"
                        alt="admin-message"
                      />
                      <h6 className="m-b-5 m-orange">
                        Welcome to Admin Dashboard
                      </h6>
                      <p style={{ color: "#777" }}>
                        Your Account is Verified! <i className="ti-thumb-up" />
                        <br /> Enjoy World's No.1 Education Software.
                      </p>
                    </div>
                  </div>

                  <div className="card m-round">
                    <div className="card-header">
                      <h5 className="m-gray">Statistics</h5>
                    </div>
                    <div className="card-block">
                      <Line options={options} data={data} />
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="m-blue1">Today Present Employees</h5>
                      <div className="card-header-right">
                        <ul className="list-unstyled card-option">
                          <li>
                            <i className="fa fa-chevron-left" />
                          </li>
                          <li>
                            <i className="fa fa-window-maximize full-card" />
                          </li>
                          <li>
                            <i className="fa fa-minus minimize-card" />
                          </li>
                          <li>
                            <i className="fa fa-refresh reload-card" />
                          </li>
                          <li>
                            <i className="fa fa-times close-card" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-block">
                      <p className="m-orange text-center">
                        <i className="ti-face-sad" />
                        <br /> Attendance Not Marked Yet !
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="card user-card m-round">
                    <Calendar value={new Date()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
