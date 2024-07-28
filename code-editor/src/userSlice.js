
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    isAdmin: false,
  },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser(state) {
      state.name = '';
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
