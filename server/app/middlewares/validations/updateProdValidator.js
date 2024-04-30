const Joi = require("joi");

// Validation Schema for updating a new Product
const updateProduct = (data) => {

    const updateSchema = Joi.object({

        name: Joi.string().min(2).max(45),
        description: Joi.string().min(5).max(255),
        brand: Joi.objectId(), // Assuming brand is a reference to another schema
        category: Joi.objectId(), // Assuming category is a reference to another schema
        price: Joi.number(),
        quantity: Joi.number(),
        imagesUrl: Joi.array().items(Joi.string().uri()) // Assuming image URLs are strings and should be valid URIs

    }).min(1) // * At least one field must be present

    return updateSchema.validate(data);
};

exports.updateValidator = (req, res, next) => {

    const { error: dataError } = updateProduct(req.body, { abortEarly: false });

    if (dataError) {
        const errorMessage = dataError.details.map(detail => detail.message);
        return res.status(400).json({
            status: 400,
            message: errorMessage
        })
    }

    next();
};