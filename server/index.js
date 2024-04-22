const express = require("express");
const mongoose = require("mongoose")
const logger = require("morgan")
const productRoutes = require("./app/routes/product.routes")
const categoryRoutes = require("./app/routes/category.routes")
require("dotenv").config();

// ________________________________________________________________________

const app = express();

// ________________________________________________________________________

const PORT = process.env.PORT || 8080;

// ________________________________________________________________________

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// ________________________________________________________________________

// Connecting with database:

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to the database!"))
    .catch((err) => {
        console.log("Cannot connect to the database!", err)
        //   process.exit();
    });
// ________________________________________________________________________

// Routes:
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/category', categoryRoutes);

// ________________________________________________________________________

app.listen(PORT, () => console.log(`App is running on Port: ${PORT}`))