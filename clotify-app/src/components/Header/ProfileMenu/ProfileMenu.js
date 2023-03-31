import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user";

import styles from "./ProfileMenu.module.css";

import OpenIcon from "./../../../assets/HeaderIcons/OpenIcon";
import CloseIcon from "./../../../assets/HeaderIcons/CloseIcon";
import UserICon from "./../../../assets/HeaderIcons/UserIcon";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const username = useSelector((state) => state.user.user.name);
  const id = useSelector((state) => state.user.user._id);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);

  const buttonClickHandler = () => {
    setShowMenu((prevState) => !prevState);
  };

  const logoutHandler = () => {
    dispatch(userActions.logout());
  };

  return (
    <div className={styles["profile-menu"]}>
      <button onClick={buttonClickHandler}>
        <div></div>
        {username}
        {!showMenu ? <OpenIcon></OpenIcon> : <CloseIcon></CloseIcon>}
      </button>
      <button className={styles["icon-button"]} onClick={buttonClickHandler}>
        <UserICon></UserICon>
      </button>
      {showMenu && (
        <ul>
          <Link to={`/library/user/${id}`}>
            <li>Profile</li>
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <li>Admin Panel</li>
            </Link>
          )}

          <hr />
          <Link to="/login" onClick={logoutHandler}>
            <li>Logout</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
