import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const filterBtnObj = {
    showFilterModalForm: false,

}

// Action
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return response.json();
});

export const homePageSlice = createSlice({
    name: 'homePageSlice',
    initialState: {
        showFilterModal: filterBtnObj,
        isLoading: false,
        data: null,
        isError: false,
    },
    reducers: {
        setShowFilterModalForm(state, action) {
            state.showFilterModal.showFilterModalForm = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const { setShowFilterModalForm } = homePageSlice.actions

export default homePageSlice.reducer

