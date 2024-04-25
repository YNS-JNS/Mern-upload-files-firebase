import { createSlice } from '@reduxjs/toolkit';
import { getCategories, createCategory } from './categoryActions';

const initialState = {

    categories: [],
    loading: false,
    error: null,
    isAdded: false,
};

const categorySlice = createSlice({

    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Fetch categories
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.categories = payload.categories;
        });
        builder.addCase(getCategories.rejected, (state, { payload }) => {
            state.loading = false;
            state.categories = [];
            state.error = payload;
            // state.error = payload.message;
        });

        // Create new category
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
            // state.error = null;
        });
        builder.addCase(createCategory.fulfilled, (state, { payload }) => {
            state.loading = false;
            // state.categories = [...state.categories, payload];
            state.categories.push(payload.category);
            state.isAdded = true;
        });
        builder.addCase(createCategory.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    }
});

export default categorySlice.reducer