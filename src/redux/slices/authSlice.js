import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isAuth: false,
    jwt: null,
    userData: {
      _id: null,
      username: null,
      name: null,
      apellido: null,
      email: null,
      role: null,
      foto: null,
      tenantId: null,
      tenantName: null,
    },
  },
  reducers: {
    setLoginAction: (state, action) => {
      return {
        ...state,
        isAuth: true,
        jwt: action.payload.jwt,
        userData: action.payload.userData,
      };
    },
    logOut: (state) => {
      return {
        ...state,
        isAuth: false,
        jwt: null,
        userData: {
          _id: null,
          username: null,
          name: null,
          apellido: null,
          email: null,
          role: null,
          foto: null,
          tenantId: null,
          tenantName: null,
        },
      };
    },
  },
});

export const { setLoginAction, logOut } = authSlice.actions;

export default authSlice.reducer;