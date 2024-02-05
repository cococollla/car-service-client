import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./CarStore";
import Car from "../interfaces/Car";

interface CarsState {
  cars: Car[];
  page: number;
  pageSize: number;
  totalItems: number;
}

const initialState: CarsState = {
  cars: [],
  page: 1,
  pageSize: 10,
  totalItems: 0,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (
      state,
      action: PayloadAction<{ cars: Car[]; totalItems: number }>
    ) => {
      state.cars = action.payload.cars;
      state.totalItems = action.payload.totalItems;
    },
    addCar: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
    updateCar: (state, action: PayloadAction<Car>) => {
      const updatedCar = action.payload;
      const index = state.cars.findIndex((car) => car.id === updatedCar.id);
      if (index !== -1) {
        state.cars[index] = updatedCar;
      }
    },
    deleteCar: (state, action: PayloadAction<number>) => {
      const carIdToDelete = action.payload;
      state.cars = state.cars.filter((car) => car.id !== carIdToDelete);
    },
    setPaginationInfo: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
  },
});

export const { setCars, addCar, updateCar, deleteCar, setPaginationInfo } =
  carsSlice.actions;
export const selectCars = (state: RootState) => state.cars;
export default carsSlice.reducer;
