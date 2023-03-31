import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import hostUrl from "../../utilities/data/hostUrl";

import styles from "./Login.module.css";

import TextInput from "../UI/Forms/TextInput/TextInput";
import MainButton from "../UI/Forms/MainButton/MainButton";
import Switch from "../UI/Forms/Switch/Switch";
import SpinningWheel from "../UI/SpinningWheel/SpinningWheel";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rememberPasswordRef = useRef();

  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState();

  const loginHandler = async (e) => {
    e.preventDefault();
    setErrorMessage();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const rememberPassword = rememberPasswordRef.current.checked;

    if (!email || !password) {
      setErrorMessage("Please fill all of the fields.");
      return;
    }

    setIsLoading(true);

    const response = await fetch(`${hostUrl}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password, rememberPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.code === 200) {
      if (rememberPassword) localStorage.setItem("userID", result.user._id);
      dispatch(userActions.setCurrentUser(result.user));
      navigate("/home");
    } else {
      setErrorMessage(result.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <main className={styles.main}>
        <h1>Clotify</h1>
        <form onSubmit={loginHandler} className={styles["login-form"]}>
          <TextInput type="email" placeholder="E-Mail Adress..." inputRef={emailRef}></TextInput>
          <TextInput type="password" placeholder="Password..." inputRef={passwordRef}></TextInput>
          <Switch inputRef={rememberPasswordRef}>Remember me</Switch>
          <SpinningWheel className={styles.loading} isLoading={isLoading}></SpinningWheel>
          {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}
          <MainButton>LOG IN</MainButton>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/register">Signup</Link>
            </span>
          </p>
        </form>
        <div className={styles["background-rectangle"]}></div>
        <div className={styles["background-rectangle"]}></div>
      </main>
    </>
  );
};

export default Login;
