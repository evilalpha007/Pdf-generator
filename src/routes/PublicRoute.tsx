import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = getCurrentUser();
  return user ? (
    <Navigate
      to={user.role !== "admin" ? "/admin-dashboard" : "/user-dashboard"}
    />
  ) : (
    children
  );
};

export default PublicRoute;
