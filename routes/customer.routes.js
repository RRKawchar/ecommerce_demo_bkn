const express=require('express');
const router=express.Router();
const controller=require('../controlles/customer.controller');

router.post('/customers',controller.createCustomer);
router.get('/customers',controller.getAllCustomer);
router.get('/customerById',controller.searchCustomerById);
router.get('/customerByName',controller.searchCustomerByName);
router.put('/updateCustomer',controller.updateCustomer);
router.delete('/deleteCustomer',controller.deleteCustomer);

module.exports=router;