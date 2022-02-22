import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";

import ModelsDisplay from "./Pages/ModelsDisplay/ModelsDisplay";
import ModelList from "./Pages/ModelList/ModelList";
import AddModel from "./Pages/AddModel/AddModel";
import ChangeModel from "./Pages/ChangeModel/ChangeModel";

import { fetchAdminData } from "./../../store/admin";

const AdminMain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAdminData(dispatch);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<ModelsDisplay></ModelsDisplay>}></Route>
      <Route path="/list" element={<ModelList></ModelList>}>
        <Route path=":model" element={<ModelList></ModelList>}></Route>
      </Route>
      <Route path="/add" element={<AddModel></AddModel>}>
        <Route path=":model" element={<AddModel></AddModel>}></Route>
      </Route>
      <Route path="/change" element={<ChangeModel></ChangeModel>}>
        <Route path=":model" element={<ChangeModel></ChangeModel>}>
          <Route path=":id" element={<ChangeModel></ChangeModel>}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminMain;
