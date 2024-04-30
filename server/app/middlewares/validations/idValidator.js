const Joi = require("joi");

// Check if Id of Product is valid or not
const checkingId = (id) => {

    const idSchema = Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'));

    return idSchema.validate(id);
};

// Middleware for Checking Product Id
exports.isIdValidator = (req, res, next) => {

    const { error: idError } = checkingId(req.params.id);

    if (idError) {
        console.log(idError.details[0].message);
        return res.status(400).json({
            status: 400,
            message: `Product Id = ${req.params.id} is invalid !`
        });
    }

    next();
};