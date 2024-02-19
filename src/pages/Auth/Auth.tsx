import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserAuth } from "../../interfaces/User";
import ApiServices from "../../services/ApiUserService";
import styles from "./Auth.module.css";
import { userAuthShema } from "../../validations/UserValidation";
import Button from "../../UiKit/Button/Button";
import { FC } from "react";
import { Modal } from "antd";

interface AuthFormProps {
  setIsAuth: (userId: string, userRole: string) => void;
}

const AuthForm: FC<AuthFormProps> = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userAuthShema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const user: UserAuth = {
      email: data.userEmail,
      password: data.userPassword,
    };
    try {
      const response = await ApiServices.auth(user);

      if (response == undefined) {
        throw new Error();
      }

      setIsAuth(response.userId, response.role);
      navigate("/cars");
    } catch (error) {
      Modal.error({
        content: "Error during authorization try again later",
        centered: true,
      });
      reset();
    }
  };

  const routToRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className={styles.auth_page}>
      <div className={styles.auth__form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className={styles.input__container}>
              <label htmlFor="userEmail">Email</label>
              <br />
              <input
                {...register("userEmail")}
                type="text"
                className={
                  errors.userEmail?.message
                    ? `${styles.auth__input__error}`
                    : `${styles.auth__input}`
                }
                required
              />
            </div>
            <div className={styles.input__container}>
              <label htmlFor="userPassword">Password</label>
              <br />
              <input
                {...register("userPassword")}
                type="password"
                className={
                  errors.userPassword?.message
                    ? `${styles.auth__input__error}`
                    : `${styles.auth__input}`
                }
                required
              />
            </div>
          </div>
          <div className={styles.button__container}>
            <Button buttonText="Log in" buttonType="primary" type="submit" />
            <Button
              buttonText="Registration"
              buttonType="secondary"
              type="button"
              onClick={() => routToRegistration()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
