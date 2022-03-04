import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        value: [],
    },
    reducers: {
        add: (state, action) => {
            const idx = state.value.indexOf(action.payload);
            if(idx === -1)
            {
                state.value.push(action.payload)
            }
        },
        remove: (state, action) => {
            const idx = state.value.indexOf(action.payload);
            state.value.splice(idx, 1);
        },
    },
})

export const {add, remove} = historySlice.actions

export default historySlice.reducer
