import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "User",
  initialState: {
    adminUser: [],
    employeeUser: [],
    editUser: {},
    openTab: "admin",
    currentAdminPage: 1,
    currentEmployeePage: 1,
  },
  reducers: {
    editValue: (state, action) => {
      state.editUser = action.payload;
    },
    getAdminUser: (state, action) => {
      state.adminUser = action.payload;
    },
    getEmployeeUser: (state, action) => {
      state.employeeUser = action.payload;
    },
    addNewAdminUser: (state, action) => {
      const newAdmin = [action.payload, ...state.adminUser];
      newAdmin.pop();
      state.adminUser = newAdmin;
    },
    addNewEmployeeUser: (state, action) => {
      const newEmployee = [action.payload, ...state.employeeUser];
      newEmployee.pop();
      state.employeeUser = newEmployee;
    },
    deleteAUser: (state, action) => {
      action.payload.user_type === "Admin"
        ? (state.adminUser = state.adminUser.filter(
            (item) => item.id !== action.payload.id
          ))
        : (state.employeeUser = state.employeeUser.filter(
            (item) => item.id !== action.payload.id
          ));
    },
    tabOpen: (state, action) => {
      state.openTab = action.payload;
    },
    setCurrentAdminPage: (state, action) => {
      state.currentAdminPage = action.payload;
    },
    setCurrentEmployeePage: (state, action) => {
      state.currentEmployeePage = action.payload;
    },
  },
});
export const userAction = UserSlice.actions;
export default UserSlice.reducer;
