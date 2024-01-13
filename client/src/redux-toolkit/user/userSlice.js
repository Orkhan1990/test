import { createSlice } from "@reduxjs/toolkit";




const initialState={
    currentUser:{},
    token:"",
    error:"",
    loading:false
}
export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
         signInSuccess:(state,action)=>{
            state.currentUser=action.payload.rest
            state.token=action.payload.token
            state.loading=false
            state.error=""
         },
         signInLoading:(state)=>{
            state.loading=true
            state.error=""
         },
         signInError:(state,action)=>{
             state.error=action.payload;
             state.loading=false;
         },
         signOut:(state)=>{
            state.currentUser="",
            state.token=""
         }
    }
});

export const{signInSuccess,signInLoading,signInError,signOut}=userSlice.actions;
export default userSlice.reducer;