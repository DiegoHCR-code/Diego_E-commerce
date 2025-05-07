import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const stored = localStorage.getItem("user");
const initialUser: User | null = stored ? JSON.parse(stored) : null;

const initialState: UserState = {
  currentUser: initialUser,
  isAuthenticated: !!initialUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;