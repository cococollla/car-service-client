import { userData } from "../../../interfaces/User";

export interface UserCreateFormProps {
  onSave: (user: userData) => void;
  onCancel: () => void;
}
