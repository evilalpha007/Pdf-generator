
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
