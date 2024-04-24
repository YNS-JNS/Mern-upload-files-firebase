import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from './productActions'

const initialState = {

    products: [],
    // product: {},
    loading: false,
    error: null,
};

const productSlice = createSlice({

    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // fetch products
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
            // console.log("pending");
        });
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.products = payload.products;
            // console.log("fulfilled");
        });
        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.loading = false;
            state.products = [];
            state.error = payload;
            // console.log("rejected");
        })
    }
});

export default productSlice.reducer