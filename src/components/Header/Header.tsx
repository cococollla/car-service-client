import styles from "./Header.module.css";
import CustomLink from "../../UiKit/CustomLink/CustomLink";
import { FC } from "react";
import { HeaderProps } from "./Header.props";

const Header: FC<HeaderProps> = ({ activeModal }) => {
  return (
    <header className={styles.header}>
      <div className={styles.item_row}>
        <img src="/images/logo.png" className={styles.logo} />
        <b className={styles.title_text}>Car service</b>
        <CustomLink to="/cars" value="Car list" />
        <CustomLink to="/carsTable" value="Cars table" />
        <div className={styles.nav_link}>{activeModal}</div>
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
