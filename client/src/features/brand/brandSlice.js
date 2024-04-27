import { createSlice } from '@reduxjs/toolkit';
import { getBrands, createBrand } from './brandActions';

const initialState = {

    brands: [],
    loading: false,
    error: null,
    isAdded: false,
};

const brandSlice = createSlice({

    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Fetch brands
        builder.addCase(getBrands.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getBrands.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.brands = payload.brands;
        });
        builder.addCase(getBrands.rejected, (state, { payload }) => {
            state.loading = false;
            state.brands = [];
            state.error = payload;
            // state.error = payload.message;
        });

        // Create new brand
        builder.addCase(createBrand.pending, (state) => {
            state.loading = true;
            // state.error = null;
        });
        builder.addCase(createBrand.fulfilled, (state, { payload }) => {
            state.loading = false;
            // state.brands = [...state.brands, payload];
            state.brands.push(payload.brand);
            state.isAdded = true;
        });
        builder.addCase(createBrand.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    }
});

export default brandSlice.reducer