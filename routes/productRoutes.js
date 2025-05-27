const express= require('express');
const router=express.Router();
const controller=require('../controlles/productController');
 const { uploadMultiple } = require('../config/upload');


router.post('/products',controller.createProduct);
router.get('/products',controller.getAllProducts);
router.get('/productByName',controller.productByName);
router.get('/productByCategoryId',controller.productByCategoryId);
router.put('/updateProducts', uploadMultiple, controller.updateProduct);
router.delete('/delete-products', controller.deleteProductById);

module.exports=router;