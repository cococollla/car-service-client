import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import User from "../../interfaces/User";
import styles from "../AuthForm/AuthForm.module.css";
import ApiServices from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import { userRegistrationSheme } from "../../validations/UserValidation";

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
    const newUser: User = {
      id: 0,
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
    <div className={styles.auth__form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input__container}>
          <label htmlFor="userName">Name</label>
          <br />
          <input
            {...register("userName")}
            type="text"
            className={styles.auth__input}
          ></input>
          <div className={styles.error}>{errors.userName?.message}</div>
        </div>
        <div className={styles.input__container}>
          <label htmlFor="userEmail">Email</label>
          <br />
          <input
            {...register("userEmail")}
            type="text"
            className={styles.auth__input}
          ></input>
          <div className={styles.error}>{errors.userEmail?.message}</div>
        </div>
        <div className={styles.input__container}>
          <label htmlFor="userPassword">Password</label>
          <br />
          <input
            {...register("userPassword")}
            type="password"
            className={styles.auth__input}
          ></input>
          <div className={styles.error}>{errors.userPassword?.message}</div>
        </div>
        <div className={styles.button__container}>
          <button type="submit" className={styles.button__submit}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
