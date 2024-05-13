import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const AddProduct = ({ brands, categories, handleAddProduct, productAddStatus }) => {

    // file image
    const [imageAsFile, setImageAsFile] = useState(null);
    // _________________________________________
    // Progress Percent %
    const [progressPercent, setProgressPercent] = useState(0);
    // _________________________________________
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        quantity: '',
        imagesUrl: null
    });
    // _________________________________________
    const [errors, setErrors] = useState({});
    // _________________________________________
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear the error for the field if it becomes non-empty
        if (value && errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }

        /*
        NB: So, this condition checks if the current value of the input field is non-empty (value) 
        and if there's already an error message stored for that field (errors[name]). 
        If both conditions are true, it clears the error message for that field, providing real-time error hiding as the user types in the input field.
        */
    };
    // _________________________________________
    const handleChangeImage = (e) => {

        const imageFile = e.target.files[0];
        setImageAsFile(imageFile);
    }
    // _________________________________________
    const handleSubmit = (e) => {
        e.preventDefault();

        // Form validation
        const formErrors = {};

        if (!formData.name) formErrors.name = 'Name is required';
        if (!formData.description) formErrors.description = 'Description is required';
        if (!formData.brand) formErrors.brand = 'Brand is required';
        if (!formData.category) formErrors.category = 'Category is required';
        if (!formData.price) formErrors.price = 'Price is required';
        if (!formData.quantity) formErrors.quantity = 'Quantity is required';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Clear errors
        setErrors({});

        // Handle form submission
        handleAddProduct(formData);


        // Clear form data
        setFormData({
            name: '',
            description: '',
            brand: '',
            category: '',
            price: '',
            quantity: '',
            imagesUrl: null
        })
    };
    // _________________________________________

    // Upload image to firebase
    const handleFireBaseUpload = (e) => {
        e.preventDefault();
        console.log('start of upload! 🚀');
        // async magic goes here...
        // lets start with some error handling
        /*
        if (imageAsFile.imageFile === null) {
            console.error(`Not an image, the image file is a ${typeof (imageAsFile.imageFile)}`);
            return;
        }
        if (imageAsFile.imageFile.type!== 'image/jpeg' && imageAsFile.imageFile.type!== 'image/png') {
            console.error(`This is not an image, the image file is a ${imageAsFile.imageFile.type}`);
            return;
        }
        if (imageAsFile.imageFile.size > 2000000) {
            console.error(`This is too large, the image file is ${imageAsFile.imageFile.size} bytes.`);
            return;
        }
        if we get here, we can upload the image
        */

        if (imageAsFile === null) {
            return console.error('No file selected');
        }

        if (imageAsFile === '') {
            return console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
            // the error message will tell you if you didn't upload an image or it was null or undefined.
        }

        const storageRef = ref(storage, `images/${imageAsFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

        uploadTask.on('state_changed',
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
                        // Assign the download url to the formData state
                        setFormData({
                            ...formData,
                            imagesUrl: downloadURL
                        });
                    });
            }
        );

        /*
        Explaining: // https://blog.logrocket.com/firebase-cloud-storage-firebase-v9-react/
        Let’s break down what is occurring in the handleSubmit function. We initialized two states for the image URL after we read the uploaded file and the progress value as the image is being uploaded.
        
        const file = e.target[0]?.files[0] created a variable and saved the supplied file to it.
        
        Next, we created a reference to the file we want to operate on by calling the ref() on the instance of the storage service we already created in the config file. As the second parameter, we passed in a path we want the ref to point to, which is optional.
        
        Once the reference has been created, we can upload a file by calling the uploadBytesResumable(). It takes the reference we created earlier and then the file to be uploaded to cloud storage. Note that uploadBytes() does exactly the same thing, so either one can be used.
        
        However, with uploadBytesResumable(), the upload can be paused and resumed, and it exposes progress updates. We use it here because we want to display the progress of the upload as it’s ongoing. If you don’t want that functionality, feel free to use uploadBytes().
        
        Next, we call the on() method on the promise returned from calling uploadBytesResumable() to listen for state changes, errors, and successful uploads. These three callback functions are run at different stages of the file upload. The first runs during the upload to observe state change events like progress, pause, and resume, while the next one is triggered when there is an unsuccessful upload. Finally, the last is run when the upload completes successfully.
        
        On successful upload, we call the getDownloadURL() to get the download URL of the file to display on the app. We then update state with the new image URL downloaded.
        */
    };
    // _________________________________________

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
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
                                        {/* Default Option */}
                                        <option value="">----Select Brand----</option>
                                        {/* Brand Options */}
                                        {
                                            brands?.map((brand, index) => (
                                                <option key={index} value={brand.id}>{brand.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
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
                                        {/* Default Option */}
                                        <option value="">----Select Category----</option>
                                        {/* Category Options */}
                                        {
                                            categories?.map((category, index) => (
                                                <option key={index} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
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
                                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
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
                                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                                </div>

                                {/* image */}
                                <div className="md:col-span-1">
                                    <label htmlFor="image" className='text-white'>Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        onChange={handleChangeImage}
                                    />
                                    {/* {!imageAsUrl && */}
                                    {!formData.image &&
                                        <div className='outerbar bg-gray-200 h-8 w-full'>
                                            <div className='innerbar bg-blue-500 h-full' style={{ width: `${progressPercent}%` }}>
                                                <span className="text-white">{progressPercent}%</span>
                                            </div>
                                        </div>
                                    }

                                    {
                                        // imageAsUrl &&
                                        formData.image &&
                                        <img src={formData.image} alt='uploaded file' className="h-200" />

                                    }
                                </div>
                                <div className="md:col-span-1 flex items-end">
                                    <button
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'
                                        onClick={handleFireBaseUpload}
                                    >
                                        Upload image
                                    </button>
                                </div>

                                <div className="md:col-span-2 text-right">
                                    <div className="inline-flex items-end">
                                        <button
                                            // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
                                            type='submit'
                                        >
                                            {productAddStatus === 'pending' ? 'Saving...' : 'Save'} {/* Change button text when loading */}
                                        </button>
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
