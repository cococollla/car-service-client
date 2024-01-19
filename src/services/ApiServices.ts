import { redirect } from "react-router-dom";
import User from "../interfaces/User";

class ApiServices {
  static async auth(user: User) {
    try {
      const response = await fetch("https://localhost:7227/api/Account/Login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.status === 404) {
        alert("Authentication failed");
      }
      const data = await response.json();
      localStorage.setItem("userId", data.value.userId);
      localStorage.setItem("role", data.value.role);
      localStorage.setItem("accessToken", data.value.accessToken);
      alert(`Success auth ${data.value.userId}`);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  static async registration(newUser: User) {
    try {
      const response = await fetch(
        "https://localhost:7227/api/Account/Signup",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (response.status === 200) {
        return redirect("/auth");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert(error);
    }
  }
}

export default ApiServices;
