import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axois'

// Get brands
export const getBrands = createAsyncThunk(
    'brand/getBrands', async (args, thunkAPI) => {

        try {

            const { data } = await axios.get('brands');
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

// Create a new brand
export const createBrand = createAsyncThunk('brand/createBrand', async (payload, thunkAPI) => {
    try {

        const { data } = await axios.post('brands', payload);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});

// Get brand
export const getBrand = createAsyncThunk(
    'brand/getBrand', async (id, thunkAPI) => {


        try {

            const { data } = await axios.get(`brands/${id}`);
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);