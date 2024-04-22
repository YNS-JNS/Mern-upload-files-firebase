import React, { useState } from 'react';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        quantity: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <div className='drop-shadow-2xl'>
            <div className="bg-gradient-to-tr to-blue-700 from-indigo-900 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-300">
                            <p className="font-medium text-lg">Add Product</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">

                                {/* name */}
                                <div className="md:col-span-2">
                                    <label htmlFor="title" className='text-white'>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="title"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        placeholder='Enter name here...'
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* description */}
                                <div className="md:col-span-2">
                                    <label htmlFor="description" className='text-white'>Description</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        className="h-20 border mt-1 rounded px-4 py-2 w-full bg-gray-50"
                                        placeholder='Enter description here...'
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {/* brand */}
                                <div className="md:col-span-1">
                                    <label htmlFor="brand" className='text-white'>Brand</label>
                                    <select
                                        name="brand"
                                        id="brand"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        value={formData.brand}
                                        onChange={handleChange}
                                    >
                                        <option value="">Brand X</option>
                                        <option value="">Brand Y</option>
                                    </select>
                                </div>

                                {/* category */}
                                <div className="md:col-span-1">
                                    <label htmlFor="category" className='text-white'>Category</label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Category X</option>
                                        <option value="">Category Y</option>
                                        <option value="">Category Z</option>
                                    </select>
                                </div>

                                {/* price */}
                                <div className="md:col-span-1">
                                    <label htmlFor="price" className='text-white'>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        placeholder='Enter price here...'
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* quantity */}
                                <div className="md:col-span-1">
                                    <label htmlFor="quantity" className='text-white'>Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        placeholder='Enter quantity here...'
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* image */}
                                <div className="md:col-span-1">
                                    <label htmlFor="image" className='text-white'>Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="md:col-span-2 text-right">
                                    <div className="inline-flex items-end">
                                        <button
                                            // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
                                            type='submit'
                                        >Save</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
