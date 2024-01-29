import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./pages/Auth/Auth";
import RegistrationForm from "./pages/RegistrationPage/Registration";
import CarsCards from "./pages/Cars/Cars";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
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
