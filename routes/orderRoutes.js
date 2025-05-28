const express = require('express');
const router=express.Router();
const orderController=require('../controlles/orderController');

router.post('/orders',orderController.createOrder);


module.exports=router;