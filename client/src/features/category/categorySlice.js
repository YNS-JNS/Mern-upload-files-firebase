import { createSlice } from '@reduxjs/toolkit';
import { getCategories, createCategory, getCategory } from './categoryActions';

const initialState = {

    categoryFetchStatus: "idle",
    categoryAddStatus: 'idle',
    categoryUpdateStatus: 'idle',
    categories: [],
    category: {},
    loading: false,
    error: null,
};

const categorySlice = createSlice({

    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Fetch categories
        builder.addCase(getCategories.pending, (state) => {
            state.categoryFetchStatus = 'pending';
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.categoryFetchStatus = 'fulfilled';
            state.loading = false;
            state.categories = payload.categories;
        });
        builder.addCase(getCategories.rejected, (state, { payload }) => {
            state.categoryFetchStatus = 'rejected';
            state.loading = false;
            state.categories = [];
            state.error = payload;
            // state.error = payload.message;
        });

        // Create new category
        builder.addCase(createCategory.pending, (state) => {
            state.categoryAddStatus = 'pending';
            state.loading = true;
            // state.error = null;
        });
        builder.addCase(createCategory.fulfilled, (state, { payload }) => {
            state.categoryAddStatus = 'fulfilled';
            state.loading = false;
            // state.categories = [...state.categories, payload];
            state.categories.push(payload.category);
        });
        builder.addCase(createCategory.rejected, (state, { payload }) => {
            state.categoryAddStatus = 'rejected';
            state.loading = false;
            state.error = payload;
        });

        // Get category
        builder.addCase(getCategory.pending, (state) => {
            state.categoryFetchStatus = 'pending';
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCategory.fulfilled, (state, { payload }) => {
            state.categoryFetchStatus = 'fulfilled';
            state.loading = false;
            state.category = payload.category;
        });
        builder.addCase(getCategory.rejected, (state, { payload }) => {
            state.categoryFetchStatus = 'rejected';
            state.loading = false;
            state.error = payload;
            // state.error = payload.message;
        });
    }
});

export default categorySlice.reducer