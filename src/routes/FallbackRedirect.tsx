import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const FallbackRedirect = () => {
  const user = getCurrentUser();
  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
      />
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default FallbackRedirect;
