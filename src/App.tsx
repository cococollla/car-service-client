import { Navigate, Route, Router, Routes } from "react-router-dom";
import AuthForm from "./pages/Auth/Auth";
import RegistrationForm from "./pages/Registration/Registration";
import Cars from "./pages/Cars/Cars";
import CarsTablePage from "./pages/CatsTablePage/CarsTablePage";
import UsersTablePage from "./pages/UsersTablePage/UsersTablePage";
import PrivateRoute from "./components/PrivateRoute/RestrictedRoute";
import { useState } from "react";
import CarsTable from "./components/CarsTable/CarsTable";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/auth" replace={true} />} />
        <Route path="/auth" element={<AuthForm setIsAuth={setIsAuth} />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route element={<PrivateRoute allowed={isAuth} />}>
          <Route path="/cars" element={<Cars />} />
        </Route>
        <Route element={<PrivateRoute allowed={isAuth} />}>
          <Route path="/carsTable" element={<CarsTablePage />} />
        </Route>
        <Route element={<PrivateRoute allowed={isAuth} />}>
          <Route path="/usersTable" element={<UsersTablePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
