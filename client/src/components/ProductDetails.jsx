import React from 'react'

const ViewProduct = ({ handleShowProductDetails }) => {
  return (
    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center ">

      {/* Overlay */}
      <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"></div>

      {/* Modal  */}
      <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
        <div className="min-w-full py-2 bg-gradient-to-tr to-blue-700 from-indigo-900 cursor-default pointer-events-auto  relative rounded-xl mx-auto max-w-sm">

          {/* Close Button */}
          <button tabIndex={-1} type="button" className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
            onClick={handleShowProductDetails}
          >
            <svg tabIndex={-1} className="h-4 w-4 cursor-pointer text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>

          {/* content  */}
          {/* <div className="w-full bg-gray-100 dark:bg-gray-800 py-8"> */}
          <div className="w-full bg-gradient-to-tr to-blue-700 from-indigo-900 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image" />
                  </div>
                  {/* <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                      <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                        Add to Cart
                      </button>
                    </div>
                    <div className="w-1/2 px-2">
                      <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                        Add to Wishlist
                      </button>
                    </div>
                  </div> */}
                </div>
                <div className="md:flex-1 px-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Name</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt.
                  </p>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                      <span className="text-gray-600 dark:text-gray-300">$29.99</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                      <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Colors:</span>
                    <div className="flex items-center mt-2">
                      <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                      <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                      <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                      <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Sizes:</span>
                    <div className="flex items-center mt-2">
                      <button className="bg-gray-300 dark:bg-blue-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-blue-400 dark:hover:bg-blue-600">S</button>
                      <button className="bg-gray-300 dark:bg-blue-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-blue-400 dark:hover:bg-blue-600">M</button>
                      <button className="bg-gray-300 dark:bg-blue-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-blue-400 dark:hover:bg-blue-600">L</button>
                      <button className="bg-gray-300 dark:bg-blue-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-blue-400 dark:hover:bg-blue-600">XL</button>
                      <button className="bg-gray-300 dark:bg-blue-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-blue-400 dark:hover:bg-blue-600">XXL</button>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>


  )
}

export default ViewProduct