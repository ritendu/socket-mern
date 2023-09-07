import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { LocalStorage } from "../../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

const initialState = {
  isLoading: false,
  users: [],
  rooms: [],
  message: [],
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (user, thunkAPI) => {
    console.log("Hello World..");
    const getToken = LocalStorage.getItem();

    try {
      const resp = await customFetch.get("/users/get/users", {
        headers: { Authorization: `Bearer ${getToken.accessToken}` },
      });
      return resp.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createRoom = createAsyncThunk(
  "/users/create/room",
  async (user, thunkAPI) => {
    const getToken = LocalStorage.getItem();

    try {
      const resp = await customFetch.post("/users/create/room", user, {
        headers: { Authorization: `Bearer ${getToken.accessToken}` },
      });
      return resp.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getRooms = createAsyncThunk(
  "/users/get/rooms",
  async (user, thunkAPI) => {
    const getToken = LocalStorage.getItem();
    try {
      const resp = await customFetch.get(`/users/get/rooms`, {
        headers: { Authorization: `Bearer ${getToken.accessToken}` },
      });
      return resp.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getMessage = createAsyncThunk(
  "/users/get/message",
  async (chatRoomId, thunkAPI) => {
    console.log(chatRoomId, "chatRoomId");
    const getToken = LocalStorage.getItem();
    try {
      console.log("Hello");
      const resp = await customFetch.get(`/users/get/message/${chatRoomId}`, {
        headers: { Authorization: `Bearer ${getToken.accessToken}` },
      });
      console.log(resp.data, "response>>>????");
      return resp.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const getUsersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload.result.data;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createRoom.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.rooms = payload.result.data;
      })
      .addCase(getRooms.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload.result.data
      })
      .addCase(getMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default getUsersSlice.reducer;
