import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAddReview = createAsyncThunk(
    'review/fetchAddReview',
    (review, { getState }) => {
        const token = getState().login.userLogged.token;
        const response = axios.post(`${process.env.REACT_APP_API_URL}/addReview`, review, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        
        const { data } = response;
        return data;
    }
);

export const fetchGetReviews = createAsyncThunk(
    'review/fetchGetReviews',
    async (_, { getState }) => {
        const token = getState().login.userLogged.token;
        const id = getState().review.postToReview;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getReviews/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw Error('Failed to fetch reviews.');
        }
    }
);

export const fetchDeleteReview = createAsyncThunk(
    'review/fetchDeleteReview',
    async (reviewId, { getState }) => {
        const token = getState().login.userLogged.token;
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteReview/${reviewId}`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw Error('Failed to delete review.');
        }
    }
);

export const fetchEditReview = createAsyncThunk(
    'review/fetchEditReview',
    async (review, { getState }) => {
        const token = getState().login.userLogged.token;
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/editReview/${review.reviewId}`, review,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw Error('Failed to edit review.');
        }
    }
);


const initialState = {
    reviews: [],
    showModal: false,
    postToReview: null,
    showModalEditMode: null,
    reviewToEdit: null,
    rating: 0,
    loading: false,
    error: null,
};


const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setShowModal(state, action) {
            state.showModal = action.payload;
        },
        setPostToReview(state, action) {
            state.postToReview = action.payload;
        },
        setShowModalEditMode(state, action) {
            state.showModalEditMode = action.payload;
        },
        setRating(state, action) {
            state.rating = action.payload;
        },
        setReviewToEdit(state, action) {
            state.reviewToEdit = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGetReviews.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchGetReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchGetReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});



export const { setShowModal, setReviewToEdit, setShowModalEditMode, setRating, setPostToReview } = reviewSlice.actions;
export default reviewSlice.reducer;
