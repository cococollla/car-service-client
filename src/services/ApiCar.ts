import axios from "axios";
import Car from "../interfaces/Car";

class ApiCarService {
  static async deleteCarById(id: number | null) {
    try {
      const response = await axios.delete(
        `http://localhost:7227/api/Car/DeleteCar/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(`Car with ID ${id} deleted successfully`);
      } else {
        console.error(`Failed to delete car with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting car with ID ${id}:`, error);
      throw error;
    }
  }

  static async getAllCars(): Promise<Car[]> {
    try {
      const response = await axios.get<Car[]>(
        "http://localhost:7227/api/Car/GetCars",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw error;
    }
  }
}

export default ApiCarService;
