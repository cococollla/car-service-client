import { FC, ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";

interface RestrictedRouteProps {
  allowed: boolean;
  path: string;
  element: ReactNode;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({
  allowed,
  element,
  path,
}) => {
  if (!allowed && path !== "/auth" && path !== "/registration") {
    return <Navigate to="/auth" replace={true} />;
  }

  return <Route path={path} element={element} />;
};

export default RestrictedRoute;
