import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from '../../utils/axios'; 
import { toast } from "react-toastify";
import { LocalStorage } from "../../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

const initialState = {
    isLoading:false,
    users:[],
    room:{}
}


export const getUsers = createAsyncThunk('user/getUsers',async(user,thunkAPI)=>{
const getToken = LocalStorage.getItem();

    try {
        const resp = await customFetch.get('/users/get/users',
        {
            headers: { Authorization: `Bearer ${getToken.accessToken}` }
        },)
        return resp.data;
    } catch (error) {
      toast.error(error.response.data.message)
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    })

export const createRoom =  createAsyncThunk('/users/create/room',async(user,thunkAPI)=>{
  const getToken = LocalStorage.getItem();

  try {
        const resp = await customFetch.post('/users/create/room',user,
        {
            headers: { Authorization: `Bearer ${getToken.accessToken}` }
        },)
        return resp.data;
  } catch (error) {
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
                state.isLoading =false
                console.log(payload,"payload")
            state.users = payload.result.data;
              })
              .addCase(getUsers.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
              }).addCase(createRoom.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(createRoom.fulfilled, (state, { payload }) => {
                console.log(payload,"payload")
                state.isLoading =false
                state.room = payload.result.data;
              })
              .addCase(createRoom.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
              })
          
          
          },
    })

 
export default getUsersSlice.reducer