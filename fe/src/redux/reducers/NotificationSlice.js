import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotifications = createAsyncThunk(
    "notification/fetchNotification",
    async (_, { getState }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/notification`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().login.userLogged.token}`,
                },
            });
            if(!response.ok) {
                throw new Error("Errore nel caricamento delle notifiche");
            }
            const { notifiche } = await response.json();
            return notifiche;
        } catch (error) {
            console.log(error);
        }
    }
);

const initialState = {
    notification: [],
    loading: false,
    error: null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                console.log(action.payload);
                state.notification = action.payload;
                state.loading = false;
            });
    }
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;