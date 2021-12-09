import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/UserType';

export interface IUserSlice extends IUser {
  id?: string;
}

const initialState: IUserSlice = {
  id: undefined,
  room_id: 0,
  name: '',
  likes: [],
  dislikes: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUserSlice>) {
      return { ...state, ...payload };
    },
    resetUser() {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;
