import { MutableRefObject } from "react";
import { Car, CarUpdateDto } from "../../../interfaces/Car";
import { FormInstance } from "antd";

interface CarFormProps {
  car?: Car | null;
  onSave: (updatedCar: CarUpdateDto) => void;
  formRef: MutableRefObject<FormInstance<any>>;
}

export default CarFormProps;
