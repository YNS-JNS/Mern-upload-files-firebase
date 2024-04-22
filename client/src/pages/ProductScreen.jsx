import React, { useState } from 'react'
import ItemProduct from '../components/ItemProduct';
import TextAnimated from '../components/TextAnimated';
import AddProduct from '../components/AddProduct';

const ProductScreen = () => {

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
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
            </div>
        </div>
    );
};

export default ProductScreen;
