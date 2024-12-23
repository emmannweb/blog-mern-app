import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.signIn);
  return userInfo && userInfo.role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
