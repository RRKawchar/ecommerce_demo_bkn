const express = require('express');
const router=express.Router();
const controller=require('../controlles/categoryController');

router.post('/categories',controller.createCategory);
router.get('/categories',controller.getAllCategory);
router.get('/categoryById',controller.searchById);
router.get('/categoryByName',controller.searchByName);
router.delete('/categoryDelete',controller.delete);
router.put('/categories',controller.update);

module.exports=router;

