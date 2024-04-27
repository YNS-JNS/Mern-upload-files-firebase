import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemProduct from '../components/ItemProduct';
import TextAnimated from '../components/TextAnimated';
import AddProduct from '../components/AddProduct';
import { getBrands } from '../features/brand/brandActions';
import { getCategories } from '../features/category/categoryActions';
import { createProduct, getProducts } from '../features/product/productActions';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';


const ProductScreen = () => {

    // Product
    const { products, loading, error, isAdded } = useSelector((state) => state.product);
    // Brand
    const { brands } = useSelector(state => state.brand);
    // Category
    const { categories } = useSelector(state => state.category);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getProducts());
        dispatch(getBrands());
        dispatch(getCategories());

    }, [dispatch])


    // _________________________________________
    // Show Add Section (Add Product)
    const [showAddSection, setShowAddSection] = useState(false);

    // Handler showAddSection:__________________
    const handleShowAddSection = () => {
        setShowAddSection(!showAddSection);
        console.log(showAddSection);
    }
    // _________________________________________

    // handleAddProduct:________________________
    const handleAddProduct = (payload) => {
        dispatch(createProduct(payload));
    };
    // _________________________________________

    // When the product is added:
    useEffect(() => {

        if (isAdded === true) {
            toast.success("New product added successfully");
            setShowAddSection(false);

        } else if (error) {
            toast.error("Error adding product, please try again later")
        }
    }, [isAdded, error]);

    // _________________________________________
    /* Consoles sections ______________________ */
    // console.log(' loading => ', loading);
    // console.log(' products: => ', products);
    // console.log(' error: => ', error);
    // console.log(' error: => ', error?.message);
    // console.log(' isAdded: => ', isAdded);
    // _________________________________________

    return (
        <div className='flex flex-col gap-6 p-10 max-w-6xl mx-auto'>
            <div className=''>
                <TextAnimated title='Hello Youness!' />
            </div>

            {/* ___________ Section button for toggle add form section ___________ */}
            <div className="flex gap-4 flex-wrap justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
                    onClick={() => handleShowAddSection()}
                >
                    {showAddSection ? 'Close' : 'Create one'}
                </button>
            </div>

            {/* ___________ Section for add new product ___________ */}
            <div style={{ opacity: showAddSection ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                {
                    showAddSection && (
                        <AddProduct brands={brands} categories={categories} handleAddProduct={handleAddProduct} loading={loading} />
                    )
                }
            </div>

            {/* ___________ Section for product list ___________ */}
            <div className='flex flex-wrap gap-7 justify-center'>
                {loading && <Loading />}
                {error &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error?.message}</span>
                    </div>
                }
                {
                    products.length !== "" ? products.map((product, index) => (
                        <ItemProduct key={index} product={product} />

                    )) : (
                        <h2 className='text-center text-2xl'>No products found</h2>
                    )
                }
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductScreen;
