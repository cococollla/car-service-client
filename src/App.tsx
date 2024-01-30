import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./pages/Auth/Auth";
import RegistrationForm from "./pages/RegistrationPage/Registration";
import CarsCards from "./pages/Cars/Cars";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/auth" replace={true} />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/cars" element={<CarsCards />} />
      </Routes>
    </div>
  );
}

export default App;
