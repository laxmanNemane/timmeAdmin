import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/AuthSlice';

const store = configureStore({
  reducer: {
    AuthUser: authSliceReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
