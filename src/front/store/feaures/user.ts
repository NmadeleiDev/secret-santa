import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IUser } from 'types/UserType';
import { boolean } from 'yup/lib/locale';

export interface IUserSlice extends IUser {
  id: string;
  isAdmin?: boolean;
}

const initialState: IUserSlice = {
  id: '',
  room_id: '',
  name: '',
  likes: '',
  dislikes: '',
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUserSlice>) {
      return { ...state, ...payload };
    },
    setRoomID(state, { payload }: PayloadAction<string>) {
      state.room_id = payload;
    },
    setIsAdmin(state, { payload }: PayloadAction<boolean>) {
      state.isAdmin = payload;
    },
    resetUser() {
      return initialState;
    },
  },
});

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
export const { setUser, setRoomID, setIsAdmin, resetUser } = userSlice.actions;
