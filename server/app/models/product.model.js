const mongoose = require("mongoose");

// Example: One-To-One 
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required !"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BrandModel',
            required: [true, "Brand must be belong to brand"]
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CategoryModel',
            required: [true, "Category must be belong to category"]
        },
        price: {
            type: Number,
            required: [true, "Price must be a number and required !"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity must be a number and required !"]
        },
        imagesUrl:{
            type: String,
            // type: Array,
            // required: [true, "Product must have at least one image"]
        }
    }
);

/* 
    One-To-Many: un produit peut appartenir à une seule catégorie, 
    mais une catégorie peut avoir plusieurs produits.           
*/

productSchema.method("toJSON", function(){
    const { _id, __v, ...object } = this.toObject();

    object.id = _id;
    
    return object;
});

module.exports = mongoose.model("ProductModel", productSchema); 