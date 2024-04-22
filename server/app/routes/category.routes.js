const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controllers');

router.post('/', categoryController.createCategory);

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.put('/:id', categoryController.updateCategoryById);

router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
