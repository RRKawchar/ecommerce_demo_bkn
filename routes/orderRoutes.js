const express = require('express');
const router=express.Router();
const orderController=require('../controlles/orderController');

router.post('/orders',orderController.createOrder);
router.get('/orders',orderController.getAllOrder);
router.get('/orders-by-customer',orderController.orderByCustomer);


module.exports=router;