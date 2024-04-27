import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axois'

// Get categories
export const getCategories = createAsyncThunk(
    'category/getCategories', async (args, thunkAPI) => {

        try {

            const { data } = await axios.get('categories');
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

// Create a new category
export const createCategory = createAsyncThunk('category/createCategory', async (payload, thunkAPI) => {
    try {

        const { data } = await axios.post('categories', payload);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});