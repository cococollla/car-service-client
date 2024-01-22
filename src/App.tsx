import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm/AuthForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationFrom";
import CarsCards from "./components/Cars/CarsCards";

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
