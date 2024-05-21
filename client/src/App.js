import "./App.css";
import { useEffect } from "react";
import Login from "./Pages/Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PublicRoute } from "./utils/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Pages/Admin/Dashboard";
import AddGroup from "./Pages/Admin/ManageGroups/AddGroup";
import Layout from "./Pages/Layout";
import GroupList from "./Pages/Admin/ManageGroups/GroupsList";
import EditGroup from "./Pages/Admin/ManageGroups/EditGroup";
import SubjectsList from "./Pages/Admin/ManageSubjects/SubjectsList";
import AddSubject from "./Pages/Admin/ManageSubjects/AddSubject";
import EditSubject from "./Pages/Admin/ManageSubjects/EditSubject";
import StudentsList from "./Pages/Admin/ManageStudents/StudentsList";
import AddStudents from "./Pages/Admin/ManageStudents/AddStudents";
import EditStudents from "./Pages/Admin/ManageStudents/EditStudents";
import EditProfessor from "./Pages/Admin/ManageProfessor/EditProfessor";
import AddProfessor from "./Pages/Admin/ManageProfessor/AddProfessor";
import ProfessorsList from "./Pages/Admin/ManageProfessor/ProfessorsList";
import EventsList from "./Pages/Admin/Events/EventsList";
import AddEvent from "./Pages/Admin/Events/AddEvent";
import EditEvent from "./Pages/Admin/Events/EditEvent";
import { current } from "./redux/actions/Actions";
import { PrivateRoute } from "./utils/ProtectedRoute";
import DashboardProfessor from "./Pages/Professor/Dashboard";
import AttendanceHistory from "./Pages/Professor/Attendance/AttendanceHistory";
import EditAttendance from "./Pages/Professor/Attendance/EditAttendance";
import CoursesList from "./Pages/Professor/Courses/CoursesList";
import { AddAttendance } from "./Pages/Professor/Attendance/AddAttendance";
import { AddCourse } from "./Pages/Professor/Courses/AddCourse";
import EditCourse from "./Pages/Professor/Courses/EditCourse";
import AddExamDate from "./Pages/Professor/Exam/AddExamDate";
import ExamDatesList from "./Pages/Professor/Exam/ExamDatesList";
import ExamScores from "./Pages/Professor/Exam/ExamScores";
import AddExamScores from "./Pages/Professor/Exam/AddExamScores";
import ExamDates from "./Pages/Student/Exam/ExamDates";
import StudentExamScores from "./Pages/Student/Exam/ExamScores";
import Attendance from "./Pages/Student/Attendance";
import ClassRoutine from "./Pages/Student/ClassRoutine";
import Courses from "./Pages/Student/Courses";
import DashboardStudent from "./Pages/Student/Dashboard";
import Moyenne from "./Pages/Student/Exam/Moyenne";
import AddProfAttendance from "./Pages/Professor/Attendance/AddProfAttendance";
import Messages from "./Pages/Messages/Messages";
function App() {
  const { user } = useSelector((state) => state.LoginReducer);
  const navigate = useNavigate();
  const routes = [
    {
      path: "/login",
      element: Login,
      routeType: PublicRoute,
      userType: "admin",
    },
    {
      path: "/admin/dashboard",
      element: Dashboard,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/add-group",
      element: AddGroup,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/groups-list",
      element: GroupList,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/edit-group/:id",
      element: EditGroup,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/subjects-list",
      element: SubjectsList,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/add-subject",
      element: AddSubject,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/edit-subject/:id",
      element: EditSubject,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/students-list",
      element: StudentsList,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/add-student",
      element: AddStudents,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/edit-student/:id",
      element: EditStudents,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/professors-list",
      element: ProfessorsList,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/add-professor",
      element: AddProfessor,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/edit-professor/:id",
      element: EditProfessor,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/event-list",
      element: EventsList,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/add-event",
      element: AddEvent,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/admin/edit-event/:id",
      element: EditEvent,
      routeType: PrivateRoute,
      userType: "admin",
    },
    // professor Routes
    {
      path: "/professor/dashboard",
      element: DashboardProfessor,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/attendance",
      element: AttendanceHistory,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/edit-attendance/:id",
      element: EditAttendance,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/add-attendance",
      element: AddAttendance,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/add-my-attendance",
      element: AddProfAttendance,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/course-list",
      element: CoursesList,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/add-course",
      element: AddCourse,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/edit-course",
      element: EditCourse,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/add-exam",
      element: AddExamDate,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/exam-list",
      element: ExamDatesList,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/notes-list",
      element: ExamScores,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/professor/add-note",
      element: AddExamScores,
      routeType: PrivateRoute,
      userType: "professor",
    },
    {
      path: "/student/exam-date",
      element: ExamDates,
      routeType: PrivateRoute,
      userType: "student",
    },
    {
      path: "/student/notes",
      element: StudentExamScores,
      routeType: PrivateRoute,
      userType: "student",
    },
    {
      path: "/student/absence",
      element: Attendance,
      routeType: PrivateRoute,
      userType: "student",
    },
    {
      path: "/student/class-routine",
      element: ClassRoutine,
      routeType: PrivateRoute,
      userType: "student",
    },
    {
      path: "/student/courses",
      element: Courses,
      routeType: PrivateRoute,
      userType: "student",
    },
    {
      path: "/student/dashboard",
      element: DashboardStudent,
      routeType: PrivateRoute,
      userType: "student",
    },
    {
      path: "/student/moyenne",
      element: Moyenne,
      routeType: PrivateRoute,
      userType: "student",
    },
    {
      path: "/student/messages",
      element: Messages,
      routeType: PrivateRoute,
      userType: "student",
    },
    {
      path: "/admin/messages",
      element: Messages,
      routeType: PrivateRoute,
      userType: "admin",
    },
    {
      path: "/professor/messages",
      element: Messages,
      routeType: PrivateRoute,
      userType: "professor",
    },
  ];
  const currentPath = window.location.pathname;

  const isLoginPage = currentPath === "/login";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current(navigate));
  }, []);

  useEffect(() => {
    if (currentPath === "/") {
      navigate("/admin/dashboard");
    }
  }, [currentPath]);

  return (
    <Layout showNavAndSidebar={!isLoginPage}>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <route.routeType user={route.userType}>
                  <route.element />
                </route.routeType>
              }
            />
          );
        })}
      </Routes>
    </Layout>
  );
}

export default App;
