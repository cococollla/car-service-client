import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  allowed: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ allowed }) => {
  return allowed ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
