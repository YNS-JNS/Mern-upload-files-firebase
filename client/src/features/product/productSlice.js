import { createSlice } from '@reduxjs/toolkit';
import { getProducts, createProduct } from './productActions';

const initialState = {

    products: [],
    loading: false,
    error: null,
    isAdded: false,
};

const productSlice = createSlice({

    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Fetch products
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.products = payload.products;
        });
        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.loading = false;
            state.products = [];
            state.error = payload;
            // state.error = payload.message;
        });

        // Create new product
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
            // state.error = null;
        });
        builder.addCase(createProduct.fulfilled, (state, { payload }) => {
            state.loading = false;
            // state.products = [...state.products, payload];
            state.products.push(payload.product);
            state.isAdded = true;
        });
        builder.addCase(createProduct.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    }
});

export default productSlice.reducer