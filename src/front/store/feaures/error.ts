import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
export const CLEAR_TIMEOUT = 3000;
export interface IErrorSlice {
  error: string;
  success: string;
}

const initialState: IErrorSlice = {
  error: '',
  success: '',
};

const userSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    setSuccess(state, { payload }: PayloadAction<string>) {
      state.success = payload;
    },
    resetError() {
      return initialState;
    },
  },
});
export const errorSelector = (state: RootState) => state.error;
export default userSlice.reducer;
export const { setError, setSuccess, resetError } = userSlice.actions;
