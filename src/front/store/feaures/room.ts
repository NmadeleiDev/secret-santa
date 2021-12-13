import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IRoom } from 'types/RoomType';

export interface IRoomSlice extends Partial<IRoom> {
  users?: IBasicUser[];
  id?: string;
}

export interface IBasicUser {
  name: string;
  id: string;
}

const initialState: IRoomSlice = {
  name: '',
  admin_id: '',
  users: [],
};

const RoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom(state, { payload }: PayloadAction<IRoomSlice>) {
      return { ...state, ...payload };
    },
    addUser(state, { payload }: PayloadAction<{ name: string; id: string }>) {
      state.users?.push(payload);
    },
    removeUser(state, { payload }: PayloadAction<string>) {
      if (payload === '') return;
      const newUsers = state.users?.filter((user) => user.id !== payload);
      console.log({ newUsers });
      state.users = newUsers;
    },
    resetRoom() {
      return initialState;
    },
  },
});

export const roomSelector = (state: RootState) => state.room;
export default RoomSlice.reducer;
export const { setRoom, addUser, removeUser, resetRoom } = RoomSlice.actions;
