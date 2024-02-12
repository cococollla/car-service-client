import { Navigate, Route, Routes } from "react-router-dom";
import AuthForm from "./pages/Auth/Auth";
import RegistrationForm from "./pages/Registration/Registration";
import Cars from "./pages/Cars/Cars";
import CarsTablePage from "./pages/CatsTablePage/CarsTablePage";
import UsersTablePage from "./pages/UsersTablePage/UsersTablePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/auth" replace={true} />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/carsTable" element={<CarsTablePage />} />
        <Route path="/usersTable" element={<UsersTablePage />} />
      </Routes>
    </div>
  );
}

export default App;
