const productModel = require('../models/productModel');
const {uploadMultiple}=require('../config/upload');
require('dotenv').config();

exports.createProduct = (req, res) => {
  uploadMultiple(req, res, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'File upload error' });
    }

    const { category_id, name, description, price, stock_quantity } = req.body;

    if (!category_id || !name || !price || !stock_quantity) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    productModel.create(category_id, name, description, price, stock_quantity, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const productId = result.insertId;
      const imagePaths = req.files.map(file => `uploads/${file.filename}`);

      if (imagePaths.length === 0) {
        return res.status(201).json({
          message: "Product created without images",
          product_id: productId
        });
      }

      // Save images to product_images table
      productModel.addImage(productId, imagePaths, (err2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({
            message: "Product saved, but image insert failed",
            product_id: productId
          });
        }

        return res.status(201).json({
          message: "Product with images created successfully",
          product_id: productId
        });
      });
    });
  });
};



exports.getAllProducts = (req, res) => {
  productModel.getAll((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Group by product and attach image arrays
    const productsMap = {};

    result.forEach(row => {
      const pid = row.product_id;
      if (!productsMap[pid]) {
        productsMap[pid] = {
          id: pid,
          name: row.name,
          description: row.description,
          price: row.price,
          stock_quantity: row.stock_quantity,
          category_id: row.category_id,
          images: []
        };
      }

      if (row.image_id) {
        productsMap[pid].images.push({
          id: row.image_id,
          product_id: pid,
          image_path: `${req.protocol}://${req.get('host')}/${row.image_path.replace(/\\/g, '/')}`
        });
      }
    });

    const productList = Object.values(productsMap);

    res.json({ data: productList });
  });
};



exports.productByName = (req, res) => {
    const searchTerm=req.query.query;
  productModel.searchByName(searchTerm,(err,results)=>{
       if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }  

    const productsMap = {};

    results.forEach(row => {
      const pid = row.product_id;
      if (!productsMap[pid]) {
        productsMap[pid] = {
          id: pid,
          name: row.name,
          description: row.description,
          price: row.price,
          stock_quantity: row.stock_quantity,
          category_id: row.category_id,
          images: []
        };
      }

      if (row.image_id) {
        productsMap[pid].images.push({
          id: row.image_id,
          product_id: pid,
          image_path: `${req.protocol}://${req.get('host')}/${row.image_path.replace(/\\/g, '/')}`
        });
      }
    });

    const productList = Object.values(productsMap);

    res.json({ data: productList });

  });
  
};



exports.productByCategoryId=(req,res)=>{
   const categoryId=req.query.categoryId;

   productModel.searchByCategoryId(categoryId,(err, results)=>{
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    } 

    const productsMap={};

    results.forEach(item=>{

       const pid=item.product_id;
       if(!productsMap[pid]){
       productsMap[pid]={
        id:pid,
        name:item.name,
        category_id:item.category_id,
        description:item.description,
        price:item.price,
        stock_quantity:item.stock_quantity,
        images:[]
       }
       }

       if(item.image_id){
        productsMap[pid].images.push({
         id:item.image_id,
         product_id:pid,
         image_path: `${req.protocol}://${req.get('host')}/${item.image_path.replace(/\\/g, '/')}`
        });
       }

    });


    const productList=Object.values(productsMap);
    res.json({
      data:productList
    })

   });
};



exports.updateProduct = (req, res) => {
  const product_id = req.query.id;

  if (!product_id) {
    return res.status(400).json({ message: 'Product ID is required in the URL' });
  }

  const { name, description, price, stock_quantity } = req.body;

  if (!name || !price || !stock_quantity) {
    return res.status(400).json({ message: 'Required fields: name, price, stock_quantity' });
  }

  const imageFiles = req.files;
  const imagePaths = imageFiles?.map(file => file.path.replace(/\\/g, '/')) || [];

  productModel.update(name, description, price, stock_quantity, product_id,(err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Failed to update product' });
    }

    if (imagePaths.length === 0) {
      return res.status(200).json({ message: 'Product updated successfully' });
    }

    productModel.deleteImagesByProductId(product_id, (deleteErr) => {
      if (deleteErr) {
        console.error('Image delete error:', deleteErr);
        return res.status(500).json({ message: 'Product updated but failed to delete old images' });
      }

      productModel.addImage(product_id, imagePaths, (addErr) => {
        if (addErr) {
          console.error('Image insert error:', addErr);
          return res.status(500).json({ message: 'Product updated but failed to add new images' });
        }

        res.status(200).json({ message: 'Product and images updated successfully' });
      });
    });
  });
};




exports.deleteProductById = (req, res) => {
  const productId = req.query.id;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required in the URL' });
  }

  // Step 1: Delete images first
  productModel.deleteImagesByProductId(productId, (deleteImagesErr) => {
    if (deleteImagesErr) {
      console.error('Image delete error:', deleteImagesErr);
      return res.status(500).json({ message: 'Failed to delete product images' });
    }

    // Step 2: Then delete product
    productModel.deleteProductById(productId, (deleteProductErr, result) => {
      if (deleteProductErr) {
        console.error('Product delete error:', deleteProductErr);
        return res.status(500).json({ message: 'Failed to delete product' });
      }

      res.status(200).json({
        message: "Product and associated images deleted successfully"
      });
    });
  });
};
