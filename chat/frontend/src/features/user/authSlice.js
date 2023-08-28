import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from '../../utils/axios'; 
import { toast } from "react-toastify";
import { LocalStorage } from "../../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

const initialState = {
    isLoading:false,
    token:null
}

export const registerUser = createAsyncThunk('user/registerUser',async(user,thunkAPI)=>{

    try {
        const resp = await customFetch.post('/auth/register', user)
        return resp.data;
    } catch (error) {
      console.log(error,"error")
      toast.error(error.response.data.message)
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    })

export const loginUser = createAsyncThunk('user/loginUser',async(user,thunkAPI)=>{
  try {
    const resp = await customFetch.post('/auth/login', user)
    return resp.data;
} catch (error) {
  toast.error(error.response.data.message)
    return thunkAPI.rejectWithValue(error.response.data.msg);
}
})


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { result,serverResponse } = payload;
            toast.success(`${serverResponse.message}`)
            state.isLoading = false;
            console.log(result.tokens,"tokens")
            state.token = result.tokens;
            LocalStorage.storeItem(result);
            // addUserToLocalStorage(user);
            // toast.success(`Hello There ${user.name}`);
          })
          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;

          })
          .addCase(loginUser.fulfilled, (state, { payload }) => {
            const { result,serverResponse } = payload;
            state.isLoading = false;
            state.token = result.tokens;
            LocalStorage.storeItem(result);
    
            toast.success(`Welcome Back ${result.data.fullName}`);
        

          })
          .addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            console.log(payload,"payload")
            toast.error(payload);
          })
      
      },
})

export const {register} = userSlice.actions
export default userSlice.reducer