
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = getCurrentUser();
  console.log("Current user:", user.role);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
