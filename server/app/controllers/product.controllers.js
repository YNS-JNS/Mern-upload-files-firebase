// Product Controllers
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");
const BrandModel = require("../models/brand.model");
const asyncHandler = require("express-async-handler");

exports.createProduct = asyncHandler(async (req, res) => {

    const { name, description, brand, category, price, quantity, imagesUrl } = req.body;

    // check product existence 
    const productExists = await ProductModel.findOne({ name });
    if (productExists) {
        throw new Error('Product Already Exists.');
    }
    // check id brand 
    const brandFound = await BrandModel.findById(brand);
    if (!brandFound) {
        throw new Error('Brand not found. Please create brand first or check brand name.');
    }
    // check id category
    const categoryFound = await CategoryModel.findById(category);
    if (!categoryFound) {
        throw new Error('Category not found. Please create category first or check category name.');
    }
    // create new product
    const newProduct = new ProductModel({
        name,
        description,
        brand,
        category,
        price,
        quantity,
        imagesUrl
    });

    await newProduct.save();

    //send response
    res.json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
    });

});


/* ____________________________________________________________________ */
/*                           GET ALL section                            */
/* ____________________________________________________________________ */
/* Mongoose Hide: _id & __v in result.                                  */
/* Src:                                                                 */
/* https://www.bezkoder.com/mongoose-one-to-one-relationship-example/   */
/* ____________________________________________________________________ */

exports.getProductList = (req, res) => {

    // * Query:
    // Example of Endpoint : 
    // http://localhost:8080/api/products?name=example&minPrice=10&maxPrice=50category=example
    const { name, minPrice, maxPrice, category } = req.query;

    // Validate input parameters
    // if (minPrice && maxPrice && isNaN(parseFloat(minPrice)) && isNaN(parseFloat(maxPrice))) {
    //     return res.status(400).json({
    //         message: "Invalid price range !"
    //     })
    // }

    const condition = {};

    // * Nb: $options: "i" makes the search case-insensitive.

    // * Filter by name
    // if (name) {
    //     condition.name = { $regex: new RegExp(name), $options: "i" };
    // }

    // * Filter by price range
    // if (minPrice && maxPrice) {
    //     condition.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    // }

    // * Filter by category
    // if (category) {
    //     condition.category = category;
    // }

    // * Use condition object to query products
    ProductModel.find(condition)
        // .populate("brand category", "-_id -__v") // Mongoose Hide: _id & __v in result.
        .sort({ _id: -1 }) // Sort by _id in descending order
        .then(products => {
            // Checking
            if (!products || products.length === 0) {

                return res.status(404).json({
                    status_code: 404,
                    message: "No products found.",
                })
            }

            // If good
            res.status(200).json({
                success: true,
                message: "Successfully retrieved products.",
                totalItems: products.length,
                products,
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Some error occurred while fetching the products.",
                error: err.message,
            })
        });
};

/* ____________________________________________________________________ */
/*                           GET PRODUCT section                        */
/* ____________________________________________________________________ */
exports.getProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const product = await ProductModel.find({ _id: id }).populate("brand category", "-_id -__v");

    if (!product) {
        throw new Error("Product not found");
    }

    res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        product,
    })

});

/* ____________________________________________________________________ */
/*                            UPDATE section                            */
/* ____________________________________________________________________ */

exports.updateProduct = (req, res) => {

    const { id } = req.params;

    ProductModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(product => {

            if (!product || product === null) {
                return res.status(404).json({
                    status_code: 404,
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                })
            }

            res.status(200).json({
                success: true,
                message: "Successfully updated product.",
                product,
            })
        }
        )
        .catch(
            err => {
                res.status(500).json({
                    success: false,
                    message: "Some error occurred while updating the product",
                    error: err.message,
                })
            }
        );
}

/* ____________________________________________________________________ */
/*                            DELETE section                            */
/* ____________________________________________________________________ */

exports.deleteOneProduct = (req, res) => {

    const { id } = req.params;

    ProductModel.findByIdAndDelete(id)
        .then(product => {

            if (!product) {
                return res.status(404).json({
                    status_code: 404,
                    message: `Cannot remove Product with id=${id}. Maybe Product was not found!`
                })
            }

            res.status(200).json({
                status_code: 200,
                message: `Product ${product.name} was removed successfully.`,
            })
        }
        )
        .catch(
            err => {
                res.status(500).json({
                    status_code: 500,
                    message: "Some error occurred while removing the product",
                    error: err.message,
                })
            }
        );
}

/* ____________________________________________________________________ */
/*                             QUERY section                            */
/* ____________________________________________________________________ */
/* Find products by Category using Query                                */
/* ____________________________________________________________________ */