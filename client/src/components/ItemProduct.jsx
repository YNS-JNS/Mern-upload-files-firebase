import React, { useState } from 'react'
import ButtonAction from './ButtonAction';
import EditIcon from './Icons/EditIcon';
import ViewIcon from './Icons/ViewIcon';
import DeleteIcon from './Icons/DeleteIcon';
import DeleteModal from './DeleteModal';
import ProductDetails from './ProductDetails';
import UpdateProduct from './UpdateProduct';

export default function ItemProduct({ product }) {

    const { id, name, description, brand, category, price, quantity, imagesUrl } = product;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [showUpdateProduct, setShowUpdateProduct] = useState(false);

    // Handler to toggle the modal visibility for dispaly product details
    const handleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }


    // Handler show Product Details:__________________
    const handleShowProductDetails = () => {
        setShowProductDetails(!showProductDetails);
    }
    // _________________________________________

    // Handler showUpdateProduct:__________________
    const handleShowUpdateProduct = () => {
        setShowUpdateProduct(!showUpdateProduct);
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
            {/* ___________ Section for display delete modal ___________ */}
            {
                showDeleteModal && (
                    <DeleteModal handleShowDeleteModal={handleShowDeleteModal} />
                )
            }

            {/* ___________ Section for show product details ___________ */}
            {
                showProductDetails && (
                    <ProductDetails handleShowProductDetails={handleShowProductDetails} />
                )
            }

            {/* ___________ Section for show update section ___________ */}
            {
                showUpdateProduct && (
                    <UpdateProduct handleShowUpdateProduct={handleShowUpdateProduct} />
                )
            }
        </>
    );
}
