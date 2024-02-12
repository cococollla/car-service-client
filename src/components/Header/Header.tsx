import styles from "./Header.module.css";
import CustomLink from "../../UiKit/CustomLink/CustomLink";
import { FC } from "react";
import { HeaderProps } from "./Header.props";
import { Dropdown, Menu, MenuProps } from "antd";

const Header: FC<HeaderProps> = ({ activeModal }) => {
  const items: MenuProps["items"] = [
    { key: "1", label: <CustomLink to="/carsTable" value="Cars table" /> },
    { key: "2", label: <CustomLink to="/usersTable" value="Users table" /> },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.item_row}>
        <img src="/images/logo.png" className={styles.logo} />
        <b className={styles.title_text}>Car service</b>
        <CustomLink to="/cars" value="Car list" />
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
          <Dropdown menu={{ items }} placement="bottomCenter" arrow={true}>
            <a
              onClick={(e) => e.preventDefault()}
              className={styles.profile_group}
            >
              <img src="/images/profile.svg" alt="Profile" />
              <b>Profile</b>
            </a>
          </Dropdown>
        </li>
      </ul>
    </header>
  );
};

export default Header;
