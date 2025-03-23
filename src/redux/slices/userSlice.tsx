import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const fetchUsersDetails = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data]; // done to keep the original data immutable
  } catch (error) {
    return error;
  }
});

// Example usage of axios to remove unused import error
// axios.get('/api/example').then(response => console.log(response.data));
