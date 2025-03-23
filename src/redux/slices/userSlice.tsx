import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const POSTS_URL = "https://jsonplaceholder.typicode.com/users";

interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  website: string;
  address: {
    suite: string;
    city: string;
  };
  company: {
    name: string;
    bs: string;
  };
}

interface UserState {
  usersDetails: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  usersDetails: [],
  status: "idle",
  error: null,
};

// got this idea from the net cause i was tring to find a way to persist the data without touching the api
// i was able to get the data from the api and store it in the redux store
// so i can use it in the app without having to make a request to the api
export const fetchUsersDetails = createAsyncThunk<
  User[],
  void,
  { state: { users: UserState } }
>("users/fetchUsers", async (_, { getState }) => {
  const { usersDetails } = getState().users;

  // Only fetch from API if usersDetails is empty
  if (usersDetails.length > 0) {
    return usersDetails;
  }

  try {
    const response = await axios.get(POSTS_URL);
    return response.data; // Load initial data
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.usersDetails.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const existingUser = state.usersDetails.find((user) => user.id === id);
      if (existingUser) {
        state.usersDetails[id - 1] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.usersDetails = state.usersDetails.filter(
        (user) => user.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersDetails = action.payload;
      })
      .addCase(fetchUsersDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An unknown error occured";
      });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
