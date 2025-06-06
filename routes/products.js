const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const authenticate = require('../middleware/auth');
const validateProduct = require('../middleware/validation');

router.get('/', productsController.getAllProducts);
router.get('/search', productsController.searchProducts);
router.get('/:id', productsController.getProductById);
router.post('/', authenticate, validateProduct, productsController.createProduct);
router.put('/:id', authenticate, validateProduct, productsController.updateProduct);
router.delete('/:id', authenticate, productsController.deleteProduct);

module.exports = router;