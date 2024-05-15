// Product Actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axois'

/**
 * @description Get all products
 * @route {GET} /api/v1/products
 * @returns {Object[]} - An array of products
 * @throws {Error} - If there is an issue fetching the products
*/
export const getProducts = createAsyncThunk(
    'product/getProducts', async (args, thunkAPI) => {

        try {

            const { data } = await axios.get('products');
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

/**
 * @description Create a new product
 * @route {POST} /api/v1/products
 * @param {Object} payload - The product data to be created.
 * @returns {Object} - The created product.
 * @throws {Error} - If there is an issue creating the product.
*/
export const createProduct = createAsyncThunk('product/createProduct', async (payload, thunkAPI) => {
    try {

        const { data } = await axios.post('products', payload);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});

/**
 * @description Get a single product by ID
 * @route {GET} /api/v1/products/:id
 * @param {string} id - The ID of the product to fetch.
 * @returns {Object} - The fetched product.
 * @throws {Error} - If there is an issue fetching the product.
*/
export const getProduct = createAsyncThunk(
    'product/getProduct', async (id, thunkAPI) => {

        try {

            const { data } = axios.get(`products/${id}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);

        }
    }
);

/**
 * @description Update a product
 * @route {PUT} /api/v1/products/:id
 * @param {Object} payload - The product data to be updated.
 * @returns {Object} - The updated product.
 * @throws {Error} - If there is an issue updating the product.
*/
export const updateProduct = createAsyncThunk(
    'product/updateProduct', async (payload, thunkAPI) => {

        try {

            const { data } = axios.put(`products/${payload.id}`, payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);

        }
    }
);

/**
 * @description Delete a product
 * @route {DELETE} /api/v1/products/:id
 * @param {string} id - The ID of the product to delete.
 * @returns {Object} - The deleted product.
 * @throws {Error} - If there is an issue deleting the product.
*/
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct", async (id, thunkAPI) => {

        try {
            const { data } = await axios.delete(`products/${id}`);
            return data;

        } catch (error) {
            thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);