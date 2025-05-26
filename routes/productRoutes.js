const express= require('express');
const router=express.Router();
const controller=require('../controlles/productController');

router.post('/products',controller.createProduct);
router.get('/products',controller.getAllProducts);
router.get('/productByName',controller.productByName);

module.exports=router;