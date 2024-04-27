import React from 'react'

const UpdateProduct = ({ handleShowUpdateProduct }) => {
    return (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center ">

            {/* Overlay */}
            <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"></div>

            {/* Modal  */}
            <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                <div className="min-w-full py-2 bg-gradient-to-tr to-blue-700 from-indigo-900 cursor-default pointer-events-auto  relative rounded-xl mx-auto max-w-sm">

                    {/* Close Button */}
                    <button tabIndex={-1} type="button" className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
                        onClick={handleShowUpdateProduct}
                    >
                        <svg tabIndex={-1} className="h-4 w-4 cursor-pointer text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close</span>
                    </button>

                    {/* content  */}
                    <div className="p-4 px-4 md:p-8 mb-6">
                        <form
                        // onSubmit={handleSubmit}
                        >
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
                                            // value={formData.name}
                                            // onChange={handleChange}
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
                                            // value={formData.description}
                                            // onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        {/* brand */}
                                        <div className="md:col-span-1">
                                            <label htmlFor="brand" className='text-white'>Brand</label>
                                            <select
                                                name="brand"
                                                id="brand"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            // value={formData.brand}
                                            // onChange={handleChange}
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
                                            // value={formData.category}
                                            // onChange={handleChange}
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
                                            // value={formData.price}
                                            // onChange={handleChange}
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
                                            // value={formData.quantity}
                                            // onChange={handleChange}
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
                                            // onChange={handleChange}
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
            </div>

        </div>


    )
}

export default UpdateProduct