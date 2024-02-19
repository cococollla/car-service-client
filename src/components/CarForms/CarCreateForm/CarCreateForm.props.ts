import { CarCreateDto } from "../../../interfaces/Car";

export interface CarCreateFormProps {
  onSave: (car: CarCreateDto) => void;
  onCancel: () => void;
}
