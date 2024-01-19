import { ChangeEvent, useState } from "react";
import User from "../../interfaces/User";
import ApiServices from "../../services/ApiServices";
import styles from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleAuthUser = () => {
    const user: User = {
      id: 0,
      name: null,
      email: email,
      password: password,
    };

    ApiServices.auth(user);
  };

  const routToRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className={styles.auth__form}>
      <div>
        <div>
          <label htmlFor="userEmail">Email</label>
          <br />
          <input
            id="userEmail"
            name="userEmail"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={styles.auth__input}
          />
        </div>
        <div>
          <label htmlFor="userPassword">Password</label>
          <br />
          <input
            id="userPassword"
            name="userPassword"
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className={styles.auth__input}
          />
        </div>
      </div>
      <div className={styles.button__container}>
        <button
          type="submit"
          className={styles.button__submit}
          onClick={() => handleAuthUser()}
        >
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
    </div>
  );
};

export default AuthForm;
