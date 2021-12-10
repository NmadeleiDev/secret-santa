import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IUser } from 'types/UserType';

export interface IUserSlice extends IUser {
  id: string;
}

const initialState: IUserSlice = {
  id: '',
  room_id: '',
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
    bindRoom(state, { payload }: PayloadAction<string>) {
      state.room_id = payload;
    },
    resetUser() {
      return initialState;
    },
  },
});

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
export const { setUser, bindRoom, resetUser } = userSlice.actions;
