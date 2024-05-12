// Product Slice
import { createSlice } from '@reduxjs/toolkit';
import { getProducts, createProduct, getProduct, updateProduct } from './productActions';

const initialState = {

    productFetchStatus: "idle",
    productAddStatus: 'idle',
    productUpdateStatus: 'idle',
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({

    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // 1- Fetch products: _________________________________________
        // ____________________________________________________________
        builder.addCase(getProducts.pending, (state) => {
            state.productFetchStatus = 'pending'
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.productFetchStatus = 'fulfilled'
            state.loading = false;
            state.products = payload.products;
        });
        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.productFetchStatus = 'rejected'
            state.loading = false;
            state.products = [];
            state.error = payload; // state.error = payload.message;
        });

        // 2- Create new product: ______________________________________
        // _____________________________________________________________
        builder.addCase(createProduct.pending, (state) => {
            state.productAddStatus = 'pending'
            state.loading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, { payload }) => {
            state.productAddStatus = 'fulfilled'
            state.loading = false;
            // state.products = [...state.products, payload]; / state.products.push(payload.product);
            state.products.unshift(payload.product); // To add an element to the beginning of an array
        });
        builder.addCase(createProduct.rejected, (state, { payload }) => {
            state.productAddStatus = 'rejected'
            state.loading = false;
            state.error = payload;
        });

        // 3- Get product: ____________________________________________
        // ____________________________________________________________
        builder.addCase(getProduct.pending, (state) => {
            state.productFetchStatus = 'pending'
            state.loading = true;
        });
        builder.addCase(getProduct.fulfilled, (state, { payload }) => {
            state.productFetchStatus = 'fulfilled'
            state.loading = false;
            state.selectedProduct = payload.product;
        });
        builder.addCase(getProduct.rejected, (state, { payload }) => {
            state.productFetchStatus = 'rejected'
            state.loading = false;
            state.error = payload;
        });

        // 4- Update product:  ________________________________________
        // ____________________________________________________________
        builder.addCase(updateProduct.pending, (state) => {
            state.productUpdateStatus = 'pending'
            state.loading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.productUpdateStatus = 'fulfilled'
            state.loading = false;
            const index = state.products.findIndex((product) => product.id === payload?.product?.id);
            if (index !== -1) {
            state.products[index] = payload?.product;
            }
        });
        builder.addCase(updateProduct.rejected, (state, { payload }) => {
            state.productUpdateStatus = 'rejected'
            state.loading = false;
            state.error = payload;
        });

        // 5- Delete product:  ________________________________________
        // ____________________________________________________________
    }
});

export default productSlice.reducer