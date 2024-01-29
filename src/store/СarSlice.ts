import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./CarStore";
import Car from "../interfaces/Car";

interface CarsState extends Array<Car> {}

const initialState: CarsState = [];

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      return action.payload;
    },
    addCar: (state, action: PayloadAction<Car>) => {
      state.push(action.payload);
    },
    updateCar: (state, action: PayloadAction<Car>) => {
      const updatedCar = action.payload;
      const index = state.findIndex((car) => car.id === updatedCar.id);
      if (index !== -1) {
        state[index] = updatedCar;
      }
    },
    deleteCar: (state, action: PayloadAction<number>) => {
      const carIdToDelete = action.payload;
      return state.filter((car) => car.id !== carIdToDelete);
    },
  },
});

export const { setCars, addCar, updateCar, deleteCar } = carsSlice.actions;
export const selectCars = (state: RootState) => state.cars;
export default carsSlice.reducer;
