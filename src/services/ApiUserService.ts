import ApiBaseService from "./ApiBaseService";
import { User, userData } from "../interfaces/User";

class ApiUserService extends ApiBaseService {
  static async auth(user: User, callback?: () => void) {
    try {
      const response = await ApiUserService.post("Account/Login", user);
      const data = response.data as {
        value: { userId: string; role: string; accessToken: string };
      };
      localStorage.setItem("userId", data.value.userId);
      localStorage.setItem("role", data.value.role);
      localStorage.setItem("accessToken", data.value.accessToken);
      callback?.();
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  static async registration(newUser: userData, callback?: () => void) {
    try {
      const response = await ApiUserService.post("Account/Signup", newUser);
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

export default ApiUserService;
