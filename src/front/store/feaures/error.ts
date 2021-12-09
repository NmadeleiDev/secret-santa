import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IErrorSlice {
  error: string;
}

const initialState: IErrorSlice = {
  error: '',
};

const userSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    resetError() {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const { setError, resetError } = userSlice.actions;
