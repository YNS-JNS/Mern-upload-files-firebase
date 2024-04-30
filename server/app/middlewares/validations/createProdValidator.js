const Joi = require("joi");

// Validation for creating a new Product
const createNewProduct = (data) => {

    const productSchema = Joi.object({
        name: Joi.string().required().min(2).max(45),
        description: Joi.string().min(5).max(255),
        brand: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Assuming brand is a reference to another schema
        category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Assuming category is a reference to another schema
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        imagesUrl: Joi.string().uri()
        // imagesUrl: Joi.array().items(Joi.string().uri()) // Assuming image URLs are strings and should be valid URIs
    });

    return productSchema.validate(data);
};

// * Custom middleware:
exports.productValidator = (req, res, next) => {

    const { error } = createNewProduct(req.body);

    if (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }

    next();
};