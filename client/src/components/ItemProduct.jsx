// ItemProduct.jsx
import React, { useEffect, useState } from 'react'
import ButtonAction from './ButtonAction';
import EditIcon from './Icons/EditIcon';
import ViewIcon from './Icons/ViewIcon';
import DeleteIcon from './Icons/DeleteIcon';
import DeleteModal from './DeleteModal';
import ProductDetails from './ProductDetails';
import UpdateProduct from './UpdateProduct';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../features/product/productActions';
import { storage } from '../firebase';
import { ref, deleteObject } from "firebase/storage";


export default function ItemProduct({ product }) {

    // Destructure product data
    const { id, name, description, brand, category, price, quantity, imagesUrl } = product;

    // _________________________________________

    // Define state variables for managing modal visibility:
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [showUpdateProduct, setShowUpdateProduct] = useState(false);
    // _________________________________________

    // Get dispatch function from Redux
    const dispatch = useDispatch();

    // Handler to toggle delete modal visibility:
    const handleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    // Handler to toggle product details visibility:
    const handleShowProductDetails = () => {
        setShowProductDetails(!showProductDetails);
    }

    // Handler to toggle update product visibility:
    const handleShowUpdateProduct = () => {
        setShowUpdateProduct(!showUpdateProduct);
    }

    // Handles removing a product:
    const handleDeleteProduct = () => {

        // Obtain a reference to the image in Firebase Storage
        const imageRef = ref(storage, imagesUrl);

        // Check if the image reference exists
        if (imageRef) {

            // Delete the image from Firebase Storage
            deleteObject(imageRef)
                .then(() => {
                    console.log('Image deleted successfully');
                })
                .catch((error) => {
                    console.error('Error deleting image:', error);
                });
        }

        // Dispatch the deleteProduct action with the product ID
        dispatch(deleteProduct(id));

        // Hide the delete modal
        setShowDeleteModal(false);
    }
    // _________________________________________

    return (
        <>
            <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
                <div>
                    <img
                        src={imagesUrl && imagesUrl}
                        alt='product cover'
                        className='h-[350px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                    />
                    <div className='p-3 flex flex-col gap-2 w-full'>
                        <p className='truncate text-lg font-semibold text-slate-700'>
                            {name}
                        </p>
                        <p className='text-slate-500 mt-2 font-semibold '>
                            {price}$
                        </p>
                    </div>
                </div>
                <center>
                    <div className='inline-flex items-center rounded-md shadow-sm mt-4 mb-2'>
                        <ButtonAction icon={<EditIcon />}
                            text="Edit"
                            onClick={handleShowUpdateProduct}
                        />
                        <ButtonAction icon={<ViewIcon />}
                            text="View"
                            onClick={handleShowProductDetails}
                        />
                        <ButtonAction icon={<DeleteIcon />}
                            text="Delete"
                            onClick={handleShowDeleteModal}
                        />
                    </div>
                </center>
            </div>

            {/* Section for display delete modal: */}
            {
                showDeleteModal && (
                    <DeleteModal handleShowDeleteModal={handleShowDeleteModal}
                        handleDeleteProduct={handleDeleteProduct}
                    // id={id}
                    />
                )
            }

            {/* Section for show product details: */}
            {
                showProductDetails && (
                    <ProductDetails
                        handleShowProductDetails={handleShowProductDetails}
                        product={product}
                    />
                )
            }

            {/* Section for show update section: */}
            {
                showUpdateProduct && (
                    <UpdateProduct
                        handleShowUpdateProduct={handleShowUpdateProduct}
                        product={product}
                    />
                )
            }
        </>
    );
}
