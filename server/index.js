const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectToDb = require("./app/configs/db.config");
const { notFound, globalErrorHandler } = require("./app/middlewares/errorHandler");
const brandRoutes = require("./app/routes/brand.routes");
const categoryRoutes = require("./app/routes/category.routes");
const productRoutes = require("./app/routes/product.routes");
require("dotenv").config();

// ________________________________________________________________________
const app = express();
// ________________________________________________________________________
const corsOptions = {
    origin: '*', // frontend URI (ReactJS)
}
// ________________________________________________________________________

const PORT = process.env.PORT || 8080;

// ________________________________________________________________________

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(logger('dev'));

// Connect to MongoDB _____________________________________________________
connectToDb();
// ________________________________________________________________________

// Routes:
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Connected to Backend successfully."
    });
});

app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

// Error handler middleware: ______________________________________________
app.use(notFound);
app.use(globalErrorHandler);
// ________________________________________________________________________

app.listen(PORT, () => console.log(`App is running 🚀 on Port: ${PORT} ✔`));