import { createSlice } from '@reduxjs/toolkit';
import { getBrands, createBrand, getBrand } from './brandActions';

const initialState = {

    brandFetchStatus: "idle",
    brandAddStatus: 'idle',
    categoryUpdateStatus: 'idle',
    brands: [],
    brand: {},
    loading: false,
    error: null,
};

const brandSlice = createSlice({

    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Fetch brands
        builder.addCase(getBrands.pending, (state) => {
            state.brandFetchStatus = 'pending';
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getBrands.fulfilled, (state, { payload }) => {
            state.brandFetchStatus = 'fulfilled';
            state.loading = false;
            state.brands = payload.brands;
        });
        builder.addCase(getBrands.rejected, (state, { payload }) => {
            state.brandFetchStatus = 'rejected';
            state.loading = false;
            state.brands = [];
            state.error = payload;
            // state.error = payload.message;
        });

        // Create new brand
        builder.addCase(createBrand.pending, (state) => {
            state.brandAddStatus = 'pending';
            state.loading = true;
            // state.error = null;
        });
        builder.addCase(createBrand.fulfilled, (state, { payload }) => {
            state.brandAddStatus = 'fulfilled';
            state.loading = false;
            // state.brands = [...state.brands, payload];
            state.brands.push(payload.brand);
        });
        builder.addCase(createBrand.rejected, (state, { payload }) => {
            state.brandAddStatus ='rejected';
            state.loading = false;
            state.error = payload;
        });

         // Get brand
         builder.addCase(getBrand.pending, (state) => {
            state.brandFetchStatus = 'pending';
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getBrand.fulfilled, (state, { payload }) => {
            state.brandFetchStatus = 'fulfilled';
            state.loading = false;
            state.brand = payload.brand;
        });
        builder.addCase(getBrand.rejected, (state, { payload }) => {
            state.brandFetchStatus = 'rejected';
            state.loading = false;
            state.error = payload;
            // state.error = payload.message;
        });
    }
});

export default brandSlice.reducer