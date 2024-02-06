import ApiBaseService from "./ApiBaseService";
import Car from "../interfaces/Car";

class ApiCarService extends ApiBaseService {
  static async deleteCarById(id: number | null) {
    try {
      const response = await ApiCarService.delete(`Car/DeleteCar/${id}`);

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
      const response = await ApiCarService.get<Car[]>("Car/GetCars");
      return response.data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw error;
    }
  }

  static async getCarsByPage(
    page: number,
    pageSize: number
  ): Promise<{ cars: Car[]; totalItems: number }> {
    try {
      const response = await ApiCarService.get<{
        cars: Car[];
        totalItems: number;
      }>(`Car/GetCarsByPage?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching cars for page ${page} and pageSize ${pageSize}:`,
        error
      );
      throw error;
    }
  }
}

export default ApiCarService;
