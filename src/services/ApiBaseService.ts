import axios, { AxiosResponse } from "axios";

class ApiBaseService {
  private static baseUrl = "http://localhost:7227/api";

  protected static async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(`${ApiBaseService.baseUrl}/${endpoint}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  protected static async post<T>(
    endpoint: string,
    data: any
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(`${ApiBaseService.baseUrl}/${endpoint}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  protected static async delete<T>(
    endpoint: string
  ): Promise<AxiosResponse<T>> {
    return axios.delete<T>(`${ApiBaseService.baseUrl}/${endpoint}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  protected static update<T>(
    endpoint: string,
    object: T
  ): Promise<AxiosResponse<T>> {
    return axios.put<T>(`${ApiBaseService.baseUrl}/${endpoint}`, object, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default ApiBaseService;
