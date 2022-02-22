import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import hostUrl from "../../utilities/data/hostUrl";

import styles from "./Register.module.css";

import TextInput from "../UI/Forms/TextInput/TextInput";
import MainButton from "../UI/Forms/MainButton/MainButton";
import SpinningWheel from "../UI/SpinningWheel/SpinningWheel";

const Register = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState();

  const registerHandler = async (e) => {
    e.preventDefault();
    setErrorMessage();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (!username || !email || !password || !repeatPassword) {
      setErrorMessage("Please fill all of the fields.");
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    // Change length later

    if (password.length < 3) {
      setErrorMessage("Password must be at least 3 characters.");
      return;
    }

    setIsLoading(true);

    const newUser = { username, email, password };

    const response = await fetch(`${hostUrl}/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setIsLoading(false);

    if (result.code === 200) {
      navigate("/login");
      return;
    }

    setErrorMessage(result.message);
  };

  return (
    <>
      <main className={styles.main}>
        <h1>Clotify</h1>
        <form onSubmit={registerHandler} className={styles["register-form"]}>
          <TextInput placeholder="Username" inputRef={usernameRef}></TextInput>
          <TextInput type="email" placeholder="E-Mail Adress..." inputRef={emailRef}></TextInput>
          <hr />
          <TextInput type="password" placeholder="Password..." inputRef={passwordRef}></TextInput>
          <TextInput type="password" placeholder="Repeat Password..." inputRef={repeatPasswordRef}></TextInput>
          <SpinningWheel className={styles.loading} isLoading={isLoading}></SpinningWheel>
          {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}
          <MainButton>REGISTER</MainButton>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
        <div className={styles["background-rectangle"]}></div>
        <div className={styles["background-rectangle"]}></div>
      </main>
    </>
  );
};

export default Register;
