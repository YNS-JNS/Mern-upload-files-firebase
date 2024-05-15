//  UpdateProduct.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandActions';
import { getCategories } from '../features/category/categoryActions';
import { updateProduct } from '../features/product/productActions';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

const UpdateProduct = ({ handleShowUpdateProduct, product }) => {

    const { id, name, description, brand, category, price, quantity, imagesUrl } = product;

    const [formData, setFormData] = useState({
        name: name || '',
        description: description || '',
        brand: brand || '',
        category: category || '',
        price: price || '',
        quantity: quantity || '',
        imagesUrl: imagesUrl || '',
    });

    // _________________________________________

    const dispatch = useDispatch();

    // Get Brands: _____________________________
    const { brands } = useSelector((state) => state.brand);

    // Get Categories: _________________________
    const { categories } = useSelector((state) => state.category);

    // _________________________________________

    // Get the new image as file for uploading it to firebase
    const [imageAsFile, setImageAsFile] = useState(null);

    // Get the selected image just for displaying it in the UI
    const [selectedImage, setSelectedImage] = useState(null);

    // _________________________________________
    // console.log("Existing image: ", formData.imagesUrl);
    // console.log("Selected image: ", selectedImage);
    // console.log("Image as file: ", imageAsFile);
    // _________________________________________

    // Progress Percent %
    const [progressPercent, setProgressPercent] = useState(0);

    // Reference to image
    const fileRef = useRef(null);

    // Handler input change:____________________
    /*
    const handleChange = (e) => {
     we're checking if the name attribute of the element that triggered the event (e.target) is equal to 'image'.
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setImageAsFile(file);

    Update formData.imagesUrl to show the selected image in the interface
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({...formData, imagesUrl: reader.result });
            };

            reader.readAsDataURL(file);

        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }
    }
    */

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    }

    // _________________________________________


    /**
     * Handler function to select an image from the user's local machine.
     * This function gets the selected file from the FileInput component, 
     * converts it to a data URL using the URL.createObjectURL() method, 
     * and updates the imageAsFile and selectedImage state variables.
     */
    const handleSelectedImage = () => {

        // Get the selected file from the FileInput component
        const file = fileRef.current.files[0];

        // Update the imageAsFile state variable
        setImageAsFile(file);

        // If a file was selected, create a data URL from it
        if (file) {
            // The data URL will contain the image data encoded in base64
            const imageUrl = URL.createObjectURL(file);

            // Update the selectedImage state variable with the data URL
            setSelectedImage(imageUrl);
        }

    }

    // _________________________________________

    // Fetch brands and categories on component mount
    useEffect(() => {

        dispatch(getBrands());
        dispatch(getCategories());
    }, [dispatch])


    // _________________________________________

    // Handles the update of a product.
    /*
        1. Before updating the product with the new image URL, retrieve the existing image URL 
        from the product data.

        2. After the update is successful, check if there was an existing image URL.

        3. If there was an existing image URL, delete that image from Firebase storage 
        using its URL.
    */

    // Handles updating the image on firebase by deleting the old image from Firebase storage
    const handleFireBaseUpdateImage = (e) => {
        e.preventDefault();
        const oldImageUrl = formData.imagesUrl;

        if (imageAsFile) {
            const storageRef = ref(storage, `images/${imageAsFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressPercent(percent);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {

                            // Update formData.imagesUrl with the new image URL
                            setFormData({ ...formData, imagesUrl: downloadURL });

                            // Delete old image from Firebase storage
                            if (oldImageUrl) {
                                const oldImageRef = ref(storage, oldImageUrl);
                                deleteObject(oldImageRef)
                                    .then(() => {
                                        console.log('Old image deleted successfully');
                                    })
                                    .catch((error) => {
                                        console.error('Error deleting old image:', error);
                                    });
                            }
                        })
                        .catch((error) => {
                            console.error('Error getting download URL:', error);
                        });
                }
            );
        }
    };

    // _________________________________________

    const handleUpdate = (e) => {
        e.preventDefault();

        // Create an object with the product id and the updated form data
        const data = { id, ...formData };

        // Dispatch an action to update the product
        dispatch(updateProduct(data));

        // Hide the update product modal
        handleShowUpdateProduct();
    }

    // _________________________________________

    return (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center ">

            {/* Overlay */}
            <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"></div>

            {/* Modal  */}
            <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                <div className="min-w-full py-2 bg-gradient-to-tr to-blue-700 from-indigo-900 cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-sm">

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
                            onSubmit={handleUpdate}
                        >
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 ">
                                <div className="lg:col-span-2">
                                    <h2 className="text-xl font-bold text-white">Edit Product</h2>
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">

                                        {/* name */}
                                        <div className="md:col-span-1">
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
                                        <div className="md:col-span-1">
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
                                                {
                                                    brands?.map((brand, index) => (

                                                        <option
                                                            key={index}
                                                            value={brand.id}
                                                        >
                                                            {brand.name}
                                                        </option>

                                                    ))
                                                }
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
                                                {
                                                    categories?.map((category, index) => (

                                                        <option
                                                            key={index}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </option>

                                                    ))
                                                }
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
                                        {/* Display selected image */}
                                        {formData?.imagesUrl && (
                                            <div className="mt-5">
                                                <img
                                                    onClick={() => fileRef.current.click()}
                                                    src={selectedImage === null ? formData?.imagesUrl : selectedImage}
                                                    alt="Selected"
                                                    className="w-1/3 p-3 max-w-full h-auto border-2 border-#191919 rounded-lg"
                                                />

                                                {
                                                    progressPercent > 0 && progressPercent < 100 ?
                                                        (<span className='text-2xl text-white'>{`Uploading ${progressPercent}%`}</span>)
                                                        :
                                                        progressPercent === 100 ?
                                                            (<span className='text-2xl text-green-500'>Image successfully uploaded! ✔</span>)
                                                            :
                                                            ''
                                                }

                                            </div>
                                        )}

                                        <div className="md:col-span-1">
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                ref={fileRef}
                                                onChange={handleSelectedImage}
                                                hidden // hide input file
                                                accept='image/*' // accept only images
                                            />

                                            <div className="md:col-span-1 flex items-end">
                                                <button
                                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'
                                                    onClick={handleFireBaseUpdateImage}
                                                >
                                                    Upload New Image
                                                </button>
                                            </div>

                                        </div>

                                        <div className="md:col-span-2 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
                                                    type='submit'
                                                >
                                                    Update
                                                </button>
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