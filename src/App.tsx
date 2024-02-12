import { Navigate, Route, Routes } from "react-router-dom";
import AuthForm from "./pages/Auth/Auth";
import RegistrationForm from "./pages/Registration/Registration";
import Cars from "./pages/Cars/Cars";
import CarsTablePage from "./pages/CatsTablePage/CarsTablePage";
import UsersTablePage from "./pages/UsersTablePage/UsersTablePage";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/auth" replace={true} />} />
        <Route path="/auth" element={<AuthForm setIsAuth={setIsAuth} />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <RestrictedRoute allowed={isAuth} path="/cars" element={<Cars />} />
        <RestrictedRoute
          allowed={isAuth}
          path="/carsTable"
          element={<CarsTablePage />}
        />
        <RestrictedRoute
          allowed={isAuth}
          path="/usersTable"
          element={<UsersTablePage />}
        />
      </Routes>
    </div>
  );
}

export default App;
