import { NavLink } from "react-router-dom";
import styles from "./TopNav.module.css";

export const TopNav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.link}>
        Dashboard
      </NavLink>
      <NavLink to="/trades" className={styles.link}>
        Trades
      </NavLink>
      <NavLink to="/calendar" className={styles.link}>
        Calendar
      </NavLink>
    </nav>
  );
};
