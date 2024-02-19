import { Navigate, Route, Routes } from "react-router-dom";
import AuthForm from "./pages/Auth/Auth";
import RegistrationForm from "./pages/Registration/Registration";
import Cars from "./pages/Cars/Cars";
import CarsTablePage from "./pages/CatsTablePage/CarsTablePage";
import UsersTablePage from "./pages/UsersTablePage/UsersTablePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated, login } = useAuth();

  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/auth" replace={true} />} />
        <Route path="/auth" element={<AuthForm setIsAuth={login} />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route element={<PrivateRoute allowed={isAuthenticated} />}>
          <Route path="/cars" element={<Cars />} />
        </Route>
        <Route element={<PrivateRoute allowed={isAuthenticated} />}>
          <Route path="/carsTable" element={<CarsTablePage />} />
        </Route>
        <Route element={<PrivateRoute allowed={isAuthenticated} />}>
          <Route path="/usersTable" element={<UsersTablePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
