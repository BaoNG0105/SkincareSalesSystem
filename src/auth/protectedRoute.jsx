import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  if (!children) {
    console.warn('ProtectedRoute: No children provided');
    return <Navigate to="/" />;
  }

  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role !== 'Staff' && role !== 'Manager') {
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    console.error('ProtectedRoute error:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
