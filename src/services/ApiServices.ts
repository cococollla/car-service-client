import { redirect } from "react-router-dom";
import User from "../interfaces/User";
import axios from "axios";

class ApiServices {
  static async auth(user: User) {
    try {
      const response = await axios.post(
        "https://localhost:7227/api/Account/Login",
        user,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      localStorage.setItem("userId", data.value.userId);
      localStorage.setItem("role", data.value.role);
      localStorage.setItem("accessToken", data.value.accessToken);
      alert(`Success auth ${data.value.userId}`);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  static async registration(newUser: User, callback?: () => void) {
    try {
      const response = await axios.post(
        "https://localhost:7227/api/Account/Signup",
        newUser,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        callback?.();
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert(error);
    }
  }
}

export default ApiServices;
