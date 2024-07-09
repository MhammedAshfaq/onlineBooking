import { useContext } from "react";
import { authContext, authConttex } from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  const isAllowed = allowedRoles.includes(role);
  const AccessibleRoute =
    token && isAllowed ? children : <Navigate to={"/login"} replace={true} />;

  return AccessibleRoute;
};

export default ProtectedRoute;
