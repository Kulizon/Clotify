import { Navigate } from "react-router";

import { useSelector } from "react-redux";

import AdminHeader from "./AdminHeader/AdminHeader";
import AdminMain from "./AdminMain";

const Admin = () => {
  let content;
  const user = useSelector((state) => state.user.user);

  if (!user._id) {
    content = <Navigate to="/login"> </Navigate>;
    return content;
  }

  const isAdmin = user.isAdmin ? true : false;

  if (!isAdmin) {
    content = <Navigate to="/home"> </Navigate>;
    return content;
  }

  content = (
    <>
      <AdminHeader></AdminHeader>
      <AdminMain></AdminMain>
    </>
  );

  return content;
};

export default Admin;
