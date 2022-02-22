import styles from "./Login.module.css";

const Login = () => {
  return (
    <main className={styles.main}>
      <div className={styles.login}>
        <h1>Admin Panel</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />
          <button>Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
