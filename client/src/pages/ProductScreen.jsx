import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemProduct from '../components/ItemProduct';
import TextAnimated from '../components/TextAnimated';
import AddProduct from '../components/AddProduct';
import { getProducts } from '../features/product/productActions';
import Loading from '../components/Loading';

const ProductScreen = () => {

    const { products, loading, error } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    console.log('------------- loading: ------------- ', loading);
    console.log('------------- products: ------------- ', products);
    console.log('------------- error: ------------- ', error);

    useEffect(() => {

        dispatch(getProducts());
    }, [dispatch])


    // _________________________________________
    const [showAddSection, setShowAddSection] = useState(false);
    // Handler showAddSection:__________________
    const handleShowAddSection = () => {
        setShowAddSection(!showAddSection);
        console.log(showAddSection);
    }
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
                        <AddProduct />
                    )
                }
            </div>

            {/* ___________ Section for product list ___________ */}
            <div className='flex flex-wrap gap-7 justify-center'>
                {loading && <Loading />}
                {
                    products.length !== "" ? products.map((product, index) => (
                        <ItemProduct key={index} product={product} />

                    )) : (
                        <h2 className='text-center text-2xl'>No products found</h2>
                    )
                }
            </div>
        </div>
    );
};

export default ProductScreen;
