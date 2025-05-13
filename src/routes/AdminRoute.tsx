import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const user = getCurrentUser(); 
  if (!user) return <Navigate to="/login" />;

  return user.role === "admin" ? children : <Navigate to="/user-dashboard" />;
};

export default AdminRoute;
