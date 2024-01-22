import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import User from "../../interfaces/User";
import ApiServices from "../../services/ApiServices";
import styles from "./AuthForm.module.css";
import { userAuthShema } from "../../validations/UserValidation";

const AuthForm = () => {
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
    const user: User = {
      id: 0,
      name: null,
      email: data.userEmail,
      password: data.userPassword,
    };
    try {
      await ApiServices.auth(user);
      reset();
    } catch (error) {
      console.error("Auth error", error);
    }
  };

  const routToRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className={styles.auth__form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.input__container}>
            <label htmlFor="userEmail">Email</label>
            <br />
            <input
              {...register("userEmail")}
              type="text"
              className={styles.auth__input}
              required
            />
            <div className={styles.error}>{errors.userEmail?.message}</div>
          </div>
          <div className={styles.input__container}>
            {" "}
            <label htmlFor="userPassword">Password</label>
            <br />
            <input
              {...register("userPassword")}
              type="password"
              className={styles.auth__input}
              required
            />
            <div className={styles.error}>{errors.userPassword?.message}</div>
          </div>
        </div>
        <div className={styles.button__container}>
          <button type="submit" className={styles.button__submit}>
            Log in
          </button>
          <button
            type="button"
            className={styles.button__secondary}
            onClick={() => routToRegistration()}
          >
            Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
