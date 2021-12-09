import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom } from 'types/RoomType';
import { string } from 'yup/lib/locale';

export interface IRoomSlice extends IRoom {}

const initialState: IRoomSlice = {
  name: '',
  admin_id: '',
};

const RoomSlice = createSlice({
  name: 'Room',
  initialState,
  reducers: {
    setRoom(state, { payload }: PayloadAction<IRoomSlice>) {
      return { ...state, ...payload };
    },
    resetRoom() {
      return initialState;
    },
  },
});

export default RoomSlice.reducer;
export const { setRoom, resetRoom } = RoomSlice.actions;
