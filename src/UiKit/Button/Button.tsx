import { FC } from "react";
import styles from "./Button.module.css";
import ButtonProps from "./Button.props";

const Button: FC<ButtonProps> = ({
  buttonType,
  buttonText,
  onClick,
  type,
  ...props
}) => {
  const buttonClass =
    buttonType === "primary"
      ? styles.button__primary
      : styles.button__secondary;

  return (
    <button className={buttonClass} type={type} onClick={onClick} {...props}>
      {buttonText}
    </button>
  );
};

export default Button;
