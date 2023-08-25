import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  isLoading:false,
  user:null,
  users:[],
  room:{}
} 



export const registerUser = createAsyncThunk('user/registerUser',async(user,thunkAPI)=>{
    try {
        const resp = await axios.post('http://localhost:4000/v1/register', user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    })

export const loginUser = createAsyncThunk('user/loginUser',async(user,thunkAPI)=>{
  try {
    const resp = await axios.post('http://localhost:4000/v1/login',user);
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})    

export const getUsers = createAsyncThunk('user/getUsers',async(user,thunkAPI)=>{
  console.log(user,"user")
  try {
    const resp = await axios.post('http://localhost:4000/v1/getUsers',user);
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})    
export const createRoom = createAsyncThunk('user/createRoom',async(user,thunkAPI)=>{
  try {
    const resp = await axios.post('http://localhost:4000/v1/create-chat-room',user);
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})

export const createMessage = createAsyncThunk('user/createMessage',async(user,thunkAPI)=>{
  console.log(user,'Hello World....')
  try {
    const resp = await axios.post('http://localhost:4000/v1/create-message',user);
    console.log(resp.data,"data>>>>>>>")
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})

    const userSlice = createSlice({
        name:'user',
        initialState,
        extraReducers: (builder) => {
            builder
              .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.data;
              // localStorage.setItem('user',payload.data);

              })
              .addCase(registerUser.rejected, (state, { payload }) => {
                // state.isLoading = false;
                // toast.error(payload);
              }).addCase(loginUser.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.data;
              localStorage.setItem('user',JSON.stringify(payload.data));

              })
              .addCase(loginUser.rejected, (state, { payload }) => {
                // state.isLoading = false;
                // toast.error(payload);
              }).addCase(getUsers.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.users = payload.data;
              // localStorage.setItem('user',payload.data);

              })
              .addCase(getUsers.rejected, (state, { payload }) => {
                // state.isLoading = false;
                // toast.error(payload);
              }).addCase(createRoom.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(createRoom.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.room = payload.data;
              // localStorage.setItem('user',payload.data);

              })
              .addCase(createRoom.rejected, (state, { payload }) => {
                // state.isLoading = false;
                // toast.error(payload);
              }).addCase(createMessage.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(createMessage.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                console.log(payload,"payload")
                state.room = payload.data;
              // localStorage.setItem('user',payload.data);

              })
              .addCase(createMessage.rejected, (state, { payload }) => {
                // state.isLoading = false;
                // toast.error(payload);
              })
           
          
          },
    })

    // export const {register,setValues} = userSlice.actions
export default userSlice.reducer