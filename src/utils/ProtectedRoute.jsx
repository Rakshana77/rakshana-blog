
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
