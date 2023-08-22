import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('user/registerUser',async(user,thunkAPI)=>{
    try {
        const resp = await axios.post('', user);
        return resp.data;
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
                console.log(payload,"payload")
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hello There ${user.name}`);
              })
              .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
              })
           
          
          },
    })