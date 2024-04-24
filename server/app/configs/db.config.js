const mongoose = require('mongoose');
require("dotenv").config();

const connectToDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected ⚡ to the database successfully! 🎉"))
        .catch((err) => {
            console.log("Cannot connect to the database!", err)
            process.exit();
        });
};

module.exports = connectToDb;