import { combineReducers, configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import LoginSlice from './reducers/LoginSlice';
import NotificationSlice from './reducers/NotificationSlice';
import PostSlice from './reducers/PostSlice';
import ReviewSlice from './reducers/ReviewSlice';



const reducerSlice = combineReducers({
    author: PostSlice,
    login: LoginSlice,
    review: ReviewSlice,
    notification: NotificationSlice
});


const store = configureStore({
    reducer: reducerSlice
})



export default store;