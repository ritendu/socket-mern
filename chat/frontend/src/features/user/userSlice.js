import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading:true,
    user:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        register:(state,payload)=>{
        }
    }
})

export const {register} = userSlice.actions
export default userSlice.reducer