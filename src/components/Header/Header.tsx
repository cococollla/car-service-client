import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.item_row}>
        <img src="/images/logo.png" className={styles.logo} />
        <div>Car service</div>
        <Link to="/cars">Cars list</Link>
        <Link to="/carsTable">Cars table</Link>
      </div>
      <ul className={styles.item_group}>
        <li>
          <img src="/images/basket.svg" />
          <b>1250 р</b>
        </li>
        <li>
          <img src="/images/favorite.svg" />
          <b>Favorite</b>
        </li>
        <li>
          <img src="/images/profile.svg" />
          <b>Profile</b>
        </li>
      </ul>
    </header>
  );
};

export default Header;
