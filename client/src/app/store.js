import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import categoryReducer from '../features/category/categorySlice';

export const store = configureStore(
    {
        reducer: {
            product: productReducer,
            brand: brandReducer,
            category: categoryReducer,
        }
    }
)