const express=require('express');
const router=express.Router();
const controller=require('../controlles/customer.controller');

router.post('/customers',controller.createCustomer);
router.get('/customers',controller.getAllCustomer);

module.exports=router;