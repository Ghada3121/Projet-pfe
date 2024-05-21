import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function PublicRoute({ children }) {
  const loggedIn = localStorage.getItem("accessToken");
  const userRole = loggedIn ? jwt_decode(loggedIn).role : null;

  if (loggedIn) {
    if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (userRole === "professor") {
      return <Navigate to="/professor/dashboard" />;
    } else {
      <Navigate to="/student/dashboard" />;
    }
  }

  return children;
}

export { PublicRoute };
