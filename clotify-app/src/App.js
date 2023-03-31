import { Routes, Route } from "react-router";

import "./App.css";

import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Player from "./components/Player/Player";
import MobileMenu from "./components/MobileMenu/MobileMenu";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";

const App = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        exact
        element={
          <div className="admin-app">
            <Admin></Admin>
          </div>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <div className="login-app">
            <Login></Login>
          </div>
        }
      ></Route>
      <Route
        path="/register"
        element={
          <div className="register-app">
            <Register></Register>
          </div>
        }
      ></Route>
      <Route
        path="*"
        element={
          <div className="app">
            <Header></Header>
            <Aside></Aside>
            <Main></Main>
            <Player></Player>
            <MobileMenu></MobileMenu>
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default App;
