import { MutableRefObject } from "react";
import { Car, CarDto } from "../../interfaces/Car";
import { FormInstance } from "antd";

interface CarFormProps {
  car?: Car | null;
  onSave: (updatedCar: CarDto) => void;
  onCancel: () => void;
  formRef: MutableRefObject<FormInstance<any>>;
}

export default CarFormProps;
