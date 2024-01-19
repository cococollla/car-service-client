import { useState } from "react";
import User from "../../interfaces/User";
import styles from "../AuthForm/AuthForm.module.css";
import ApiServices from "../../services/ApiServices";

const RegistrationForm = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegistrationUser = () => {
    const newUser: User = {
      id: 0,
      name: name,
      email: email,
      password: password,
    };

    ApiServices.registration(newUser);
  };

  return (
    <div className={styles.auth__form}>
      <div>
        <div>
          <label htmlFor="userName">Name</label>
          <br />
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={(e) => setName(e.target.value)}
            className={styles.auth__input}
          ></input>
        </div>
        <div>
          <label htmlFor="userEmail">Email</label>
          <br />
          <input
            id="userEmail"
            name="userEmail"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.auth__input}
          ></input>
        </div>
        <div>
          <label htmlFor="userPassword">Password</label>
          <br />
          <input
            id="userPassword"
            name="userPassword"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.auth__input}
          ></input>
        </div>
        <div className={styles.button__container}>
          <button
            type="submit"
            className={styles.button__submit}
            onClick={() => handleRegistrationUser()}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
