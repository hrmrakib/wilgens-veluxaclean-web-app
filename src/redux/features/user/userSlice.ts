import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  _id: string;
  name: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  email: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: { payload: IUser }) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("VeluxaCleanUser");
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;
export default userSlice.reducer;
