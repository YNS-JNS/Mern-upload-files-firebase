/**
 * Middleware function to handle requests to non-existent routes.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.notFound = (req, res, next) => {
    /**
     * Create a new error object and set its message to indicate
     * that the requested route does not exist.
     * @type {Error}
    */
    const error = new Error(`Not Found: ${req.originalUrl}`);

    // Set the response status to 404 (Not Found)
    res.status(404);

    // Pass the error to the next middleware.
    next(error);
};

exports.globalErrorHandler = (error, req, res, next) => {

    // Extract the stack trace from the error object
    const stack = error.stack; // The stack trace is like a detailed report of what happened leading up to the fall. It helps whoever comes to help you understand what went wrong

    // Set the response status to 500 (Internal Server Error) if the initial status is 200,
    // otherwise keep the initial status.
    const statusCode = res?.statusCode === 200 ? 500 : res.statusCode;

    // Set the response status to 500 (Internal Server Error)
    res.status(statusCode).json({
        success: false,
        message: error?.message,
        error: stack,
    });
};