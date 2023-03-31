import { createSlice } from "@reduxjs/toolkit";
import hostUrl from "../utilities/data/hostUrl";

const adminInitialState = { data: {} };

const admin = createSlice({
  name: "admin",
  initialState: adminInitialState,
  reducers: {
    addAllData(state, action) {
      state.data = action.payload;
    },
  },
});

const adminActions = admin.actions;

const fetchAdminData = async (dispatch) => {
  const response = await fetch(`${hostUrl}/admin/all`);
  const result = await response.json();

  dispatch(adminActions.addAllData(result));
};

export default admin;

export { adminActions, fetchAdminData };
