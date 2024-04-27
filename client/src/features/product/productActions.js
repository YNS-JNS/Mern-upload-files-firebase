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