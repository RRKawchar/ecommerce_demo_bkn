const express=require('express');
const router=express.Router();
const controller=require('../controlles/category.controller');

router.post('/categories',controller.createCategory);
router.get('/categories',controller.getCategories);
router.get('/searchByCategoryName',controller.searchCategoryByName);

module.exports=router;