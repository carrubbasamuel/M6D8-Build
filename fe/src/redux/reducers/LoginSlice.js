
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import io from 'socket.io-client';



//Login
export const fetchLogin = createAsyncThunk(
    'login/fetchLogin',
    async (user) => {
        try {
            const response = await toast.promise(fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }), {
                pending: 'Login...',
                success: 'Login completed!',
                error: 'Login failed!'
            },{
                position: toast.POSITION.TOP_CENTER
            });
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


//Register
export const fetchRegister = createAsyncThunk(
    'login/fetchRegister',
    async (user) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }
)

export const fetchDelete = createAsyncThunk(
    'login/fetchDelete',
    async (_, { getState, dispatch }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + getState().login.userLogged.token,
                }
            });
            const { data } = response;
            dispatch(logout());
            console.log(data);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
)


//*PATCH to update the avatar user
export const fetchUpdateAvatar = createAsyncThunk(
    'login/fetchUpdateAvatar',
    async (file, { getState }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await toast.promise(axios.patch(`${process.env.REACT_APP_API_URL}/updateAvatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${getState().login.userLogged.token}`,
                }
            }), {
                pending: 'Updating avatar...',
                success: 'Avatar updated!',
                error: 'Avatar update failed!'
            },{
                position: toast.POSITION.TOP_CENTER
            });
            const { data } = response;
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
)

export const fetchAnUser = createAsyncThunk(
    'user/fetchAnUser',
    async (id, { getState }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().login.userLogged.token}`,
                }
            });
            const { data } = response;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


export const socket = io(process.env.REACT_APP_API_URL);//socket connection



const initialState = {
    userLogged: JSON.parse(localStorage.getItem('user')) || null,
    userSelected: null,
    codeRegister: null,
    loading: false,
    error: null
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state, action) => {
            socket.emit('disconnectedUser', state.userLogged.user._id);
            localStorage.removeItem('user');
            state.userLogged = null;
        },
        setCodeRegister: (state, action) => {
            state.codeRegister = action.payload;
        },
        setUserLogged: (state, action) => {
            socket.emit('setUserId', action.payload.user._id);
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.userLogged = action.payload;
        },
        setEmitSocketConnection: (state, action) => {
            socket.emit('setUserId', action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload));
                console.log(action.payload);
                socket.emit('setUserId', action.payload.user.userId);
                state.userLogged = action.payload;
                state.loading = false;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchRegister.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.codeRegister = action.payload;
                state.loading = false;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchDelete.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchDelete.fulfilled, (state, action) => {
                state.isDeleteble = true;
                state.loading = false;
            })
            .addCase(fetchDelete.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchUpdateAvatar.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUpdateAvatar.fulfilled, (state, action) => {
                state.userLogged.user = action.payload.user;
                localStorage.setItem('user', JSON.stringify(state.userLogged));
                state.loading = false;
            })
            .addCase(fetchUpdateAvatar.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchAnUser.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(fetchAnUser.fulfilled, (state, action) => {
                state.userSelected = action.payload;
                state.loading = false;
            }
            )
            .addCase(fetchAnUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            }
            )
    }
})


export const { logout, setCodeRegister, setUserLogged, setEmitSocketConnection } = loginSlice.actions;
export default loginSlice.reducer;
