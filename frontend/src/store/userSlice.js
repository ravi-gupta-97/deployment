import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedUser: null
}

// creating a user-slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        signin: (state, action) => {
            state.loggedUser = action.payload;
        },
        signout: (state) => {
            state.loggedUser = null;
        }
    }
})

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
