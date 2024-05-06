import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axois'

// Get products
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

// Create a new product
export const createProduct = createAsyncThunk('product/createProduct', async (payload, thunkAPI) => {
    try {

        const { data } = await axios.post('products', payload);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});

// Get product
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

// Update product
export const updateProduct = createAsyncThunk(
    'product/updateProduct', async (payload, thunkAPI) => {

        const { id, data } = payload;

        try {

            const response = axios.get(`products/${id}`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);

        }
    }
);