const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/category.model');

// POST - Create a new category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check if the category already exists
  const categoryExists = await CategoryModel.findOne({ name });
  if (categoryExists) {
    throw new Error('Category already exists.');
  }

  // Create the new category
  const category = await CategoryModel.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    category
  });
});

// GET - Get all categories
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.find();
  res.status(200).json({
    success: true,
    message: 'Categories fetched successfully',
    categories
  });
});

// GET - Get a single category by ID
exports.getCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    throw new Error('Category not found.');
  }
  res.status(200).json({
    success: true,
    message: 'Category fetched successfully',
    category
  });
});

// PUT - Update a category by ID
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) {
    throw new Error('Category not found.');
  }
  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    category
  });
});

// DELETE - Delete a category by ID
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new Error('Category not found.');
  }
  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
    category
  });
});
