const express= require('express');
const router=express.Router();
const controller=require('../controlles/productController');

router.post('/products',controller.createProduct);
router.get('/products',controller.getAll);

module.exports=router;