import ApiBaseService from "./ApiBaseService";
import { ResponseAuth, User, UserAuth, userData } from "../interfaces/User";
import axios, { AxiosResponse } from "axios";
import { ErrorResponse } from "react-router-dom";

class ApiUserService extends ApiBaseService {
  static async auth(
    user: UserAuth,
    callback?: () => void
  ): Promise<ResponseAuth | undefined> {
    try {
      const response = await ApiUserService.post<ResponseAuth>(
        "Account/Login",
        user
      );
      callback?.();
      return response.data;
    } catch (error) {
      console.error("Authentication error:", error);
      return undefined;
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

  static async getUsers(): Promise<User[]> {
    try {
      const response = await ApiUserService.get<User[]>("User/GetUsers");
      return response.data;
    } catch (error) {
      console.error("Error fetching users", error);
      throw error;
    }
  }

  static async addUser(user: userData) {
    try {
      await ApiUserService.post("User/CreateUser", user);
    } catch (error) {
      console.error("Error added user");
      throw error;
    }
  }

  static async userDelete(userId: number | null) {
    try {
      const response = await ApiUserService.delete(`User/DeleteUser/${userId}`);

      if (response.status === 200) {
        console.log(`User with ID ${userId} deleted successfully`);
      } else {
        console.error(`Failed to delete user with ID ${userId}`);
      }
    } catch (error) {
      console.error(`Error deleting car with ID ${userId}:`, error);
      throw error;
    }
  }

  static async updateUser(user: User) {
    try {
      await ApiUserService.update("User/UpdateUser", user);
    } catch (error) {
      console.error(`Failed to update user with ID ${user.id}`, error);
      throw error;
    }
  }

  static async logout() {
    try {
      await axios.get(`${ApiBaseService.baseUrl}/Account/Logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          userId: localStorage.getItem("userId"),
        },
      });
    } catch (error) {
      console.error("Failed to logout", error);
      throw error;
    }
  }
}

export default ApiUserService;
