import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from '../../utils/axios'; 
import { toast } from "react-toastify";
import { LocalStorage } from "../../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

const initialState = {
    isLoading:false,
    token:null
}

export const getUsers = createAsyncThunk('user/getUsers',async(user,thunkAPI)=>{
const getToken = LocalStorage.getItem();
console.log(getToken,"getToken")
    try {
        const resp = await customFetch.get('/users/getUsers',
        {
            headers: { Authorization: `Bearer ${getToken}` }
        },)
        return resp.data;
    } catch (error) {
      console.log(error,"error")
      toast.error(error.response.data.message)
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    })

    const getUsersSlice = createSlice({
        name:'user',
        initialState,
        reducers:{
       
        },
        extraReducers: (builder) => {
            builder
              .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getUsers.fulfilled, (state, { payload }) => {
            console.log(payload,"payload")
              })
              .addCase(getUsers.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
              })
          
          
          },
    })
    
export default getUsersSlice.reducer