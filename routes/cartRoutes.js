const express=require('express');
const router=express.Router();
const controller=require('../controlles/cartController');


router.post('/add-to-cart',controller.createCartItems);
router.get('/getAllCart',controller.getAllCartItem);
router.put('/updateCart',controller.updateCart);
router.delete('/deleteCart',controller.deleteCart);



module.exports=router;