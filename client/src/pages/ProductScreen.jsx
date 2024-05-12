import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemProduct from '../components/ItemProduct';
import TextAnimated from '../components/TextAnimated';
import AddProduct from '../components/AddProduct';
import Loading from '../components/Loading';
import { getBrands } from '../features/brand/brandActions';
import { getCategories } from '../features/category/categoryActions';
import { createProduct, getProducts } from '../features/product/productActions';
import { ToastContainer, toast } from 'react-toastify';


const ProductScreen = () => {

    // Get Products: ____________________________
    const {
        productFetchStatus,
        productAddStatus,
        productUpdateStatus,
        products,
        selectedProduct,
        loading,
        error
    } = useSelector((state) => state.product);

    // Get Brands: _____________________________
    const { brands } = useSelector(state => state.brand);

    // Get Categories: _________________________
    const { categories } = useSelector(state => state.category);

    // _________________________________________

    const [showAddSection, setShowAddSection] = useState(false);
    const dispatch = useDispatch();

    // _________________________________________

    // Fetch products, brands and categories on component mount and whenever the productUpdateStatus changes
    useEffect(() => {

        // Fetch products
        dispatch(getProducts());
        // Fetch brands
        dispatch(getBrands());
        // Fetch categories
        dispatch(getCategories());

    }, [dispatch, productUpdateStatus]); // Only re-run the effect when dispatch or productUpdateStatus changes

    // _________________________________________


    // Handler showAddSection:__________________
    const handleShowAddSection = () => {
        setShowAddSection(!showAddSection);
    }
    // _________________________________________

    // handler Adding New Product:______________
    const handleAddProduct = (payload) => {
        dispatch(createProduct(payload));
    };

    // _________________________________________

    // Toast notifications for product add and update actions
    useEffect(() => {

        // Toast notification for product add
        if (productAddStatus === 'fulfilled') {
            toast.success("New product added successfully");
            setShowAddSection(false);
        }
        if (productAddStatus === 'rejected') {
            toast.error("Error adding product, please try again later")
        }

        // Toast notification for product update
        if (productUpdateStatus === 'fulfilled') {
            toast.success("Product updated successfully");
        }
        if (productUpdateStatus === 'rejected') {
            toast.error("Error updating product, please try again later")
        }

    }, [productAddStatus, productUpdateStatus]); // Only re-run the effect when productAddStatus or productUpdateStatus changes

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
                        <AddProduct
                            brands={brands}
                            categories={categories}
                            handleAddProduct={handleAddProduct}
                            productAddStatus={productAddStatus}
                        />
                    )
                }
            </div>

            {/* ___________ Section for product list ___________ */}
            <div className='flex flex-wrap gap-7 justify-center'>
                {loading && <Loading />}
                {
                    error
                    &&
                    (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error?.message}</span>
                        </div>
                    )
                }
                {
                    products.length !== "" ? products.map((product, index) => (
                        <ItemProduct
                            key={index}
                            product={product}
                        />

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
