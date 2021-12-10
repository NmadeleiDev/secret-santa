import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IRoom } from 'types/RoomType';
import { string } from 'yup/lib/locale';

export interface IRoomSlice extends Partial<IRoom> {
  users?: string[];
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
    resetRoom() {
      return initialState;
    },
  },
});

export const roomSelector = (state: RootState) => state.room;
export default RoomSlice.reducer;
export const { setRoom, resetRoom } = RoomSlice.actions;
