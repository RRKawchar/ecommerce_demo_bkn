const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const productModel = require('../models/productModel');
const {uploadMultiple}=require('../config/upload');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

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

    const productName = req.query.name;

    if (!productName) {
        return res.status(409).send({
            message: "Name is required!"
        });
    }

    productModel.searchByName(productName, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error"
            });
        }

        if (result.length == 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "Data not found"
            });
        }

        return res.status(200).send({
            statusCode: 200,
            data: result
        });

    });

};