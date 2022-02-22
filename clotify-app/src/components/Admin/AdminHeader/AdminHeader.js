import { Link } from "react-router-dom";
import { userActions } from "../../../store/user";
import { useDispatch } from "react-redux";

import styles from "./AdminHeader.module.css";

const AdminHeader = () => {
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    dispatch(userActions.logout());
  };

  return (
    <header className={styles.header}>
      <Link to="/admin">
        <h2>Admin Panel</h2>
      </Link>
      <ul>
        <Link to="/">
          <li>VIEW SITE</li>
        </Link>
        <Link to="/login" onClick={logoutHandler}>
          <li>LOGOUT</li>
        </Link>
      </ul>
    </header>
  );
};

export default AdminHeader;
