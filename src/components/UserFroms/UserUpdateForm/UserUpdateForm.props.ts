import { User } from "../../../interfaces/User";

export interface UserUpdateFormProps {
  user?: User | null;
  onSave: (updatedCar: User) => void;
  onCancel: () => void;
}
