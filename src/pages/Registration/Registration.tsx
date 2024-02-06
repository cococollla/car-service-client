import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userData } from "../../interfaces/User";
import styles from "../Auth/Auth.module.css";
import ApiServices from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import { userRegistrationSheme } from "../../validations/UserValidation";
import Button from "../../UiKit/Button/Button";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userRegistrationSheme),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const newUser: userData = {
      name: data.userName,
      email: data.userEmail,
      password: data.userPassword,
    };
    try {
      ApiServices.registration(newUser, () => navigate("/auth"));
      reset();
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div className={styles.auth_page}>
      <div className={styles.auth__form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input__container}>
            <label htmlFor="userName">Name</label>
            <br />
            <input
              {...register("userName")}
              type="text"
              className={
                errors.userName?.message
                  ? `${styles.auth__input__error}`
                  : `${styles.auth__input}`
              }
            ></input>
            <div className={styles.error}>{errors.userName?.message}</div>
          </div>
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
            ></input>
            <div className={styles.error}>{errors.userEmail?.message}</div>
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
            ></input>
            <div className={styles.error}>{errors.userPassword?.message}</div>
          </div>
          <div className={styles.button__container}>
            <Button buttonText="Sign up" buttonType="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
