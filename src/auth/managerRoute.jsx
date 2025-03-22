import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const ManagerRoute = ({ children }) => {
  if (!children) {
    console.warn("ManagerRoute: No children provided");
    return <Navigate to="/" />;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role !== "Manager") {
      return <Navigate to="/dashboard/" />;
    }

    return children;
  } catch (error) {
    console.error("ManagerRoute error:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

ManagerRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ManagerRoute;
