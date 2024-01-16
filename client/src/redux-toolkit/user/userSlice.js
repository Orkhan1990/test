import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: "",
  loading: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      // state.token=action.payload.token
      state.loading = false;
      state.error = "";
    },
    signInLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    signInError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = "";
    },
    updateUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserSuccess:(state)=>{
         state.currentUser=null;
         state.error="";
         state.loading=false
    },
    deleteUserError:(state,action)=>{
      state.error=action.payload;
      state.loading=false;
    },
    signOut: (state) => {
      state.currentUser =null;
      state.loading=false;
      state.error=""
    }
  },
});

export const {
  signInSuccess,
  signInLoading,
  signInError,
  signOut,
  updateUserLoading,
  updateUserSuccess,
  updateUserError,
  deleteUserError,
  deleteUserSuccess
} = userSlice.actions;
export default userSlice.reducer;
