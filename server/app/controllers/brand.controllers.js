const asyncHandler = require('express-async-handler');
const BrandModel = require('../models/brand.model');

// POST
exports.createBrand = asyncHandler(async (req, res) => {

  // check brand existence 
  const brandExists = await BrandModel.findOne({ name: req.body.name });
  if (brandExists) {
    throw new Error('Brand Already Exists.');
  }

  const brand = await BrandModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "Brand created successfully",
    brand
  });
});

// GET ALL
exports.getBrands = asyncHandler(async (req, res) => {
  const brands = await BrandModel.find();
  res.status(200).json({
    success: true,
    message: "getting brands successfully",
    brands
  });
});

// GET BY ID
exports.getBrand = asyncHandler(async (req, res) => {
  const brand = await BrandModel.findById(req.params.id);
  if (!brand) {
    // res.status(404);
    throw new Error('Brand not found');
  }
  res.status(200).json({
    success: true,
    message: "getting brand successfully",
    brand
  });
});

// PUT
exports.updateBrand = asyncHandler(async (req, res) => {
  const brand = await BrandModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!brand) {
    // res.status(404);
    throw new Error('Brand not found');
  }
  res.status(200).json({
    success: true,
    message: "Brand updated successfully",
    brand
  });
});

// DELETE BY ID
exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await BrandModel.findByIdAndDelete(req.params.id);
  if (!brand) {
    // res.status(404);
    throw new Error('Brand not found');
  }
  res.status(200).json({
    success: true,
    message: 'Brand deleted successfully',
    brand
  });
});
