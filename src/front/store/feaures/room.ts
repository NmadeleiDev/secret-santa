import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IRoom } from 'types/RoomType';

export interface IRoomSlice extends Partial<IRoom> {
  users?: { name: string; id: string }[];
  id?: string;
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
    resetRoom() {
      return initialState;
    },
  },
});

export const roomSelector = (state: RootState) => state.room;
export default RoomSlice.reducer;
export const { setRoom, resetRoom } = RoomSlice.actions;
