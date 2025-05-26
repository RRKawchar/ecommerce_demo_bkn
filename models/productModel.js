const db = require('../config/db');

const productModel = {
   create: (category_id, name, description, price, stock_quantity, callBack) => {
      const sql = `INSERT INTO products(category_id,name,description,price,stock_quantity) VALUES(?,?,?,?,?)`;
      db.query(sql, [category_id, name, description, price, stock_quantity], callBack);
   },

   addImage: (product_id, imagePaths, callBack) => {
      const sql = `INSERT INTO product_images(product_id, image_path) VALUES ?`;
      const values = imagePaths.map(path => [product_id, path]);
      db.query(sql, [values], callBack);
   },

  getAll: (callback) => {

    const sql = `
      SELECT 
        p.id AS product_id, p.name, p.description, p.price, p.stock_quantity, p.category_id,
        i.id AS image_id, i.image_path
      FROM products p
      LEFT JOIN product_images i ON p.id = i.product_id
      ORDER BY p.id DESC
    `;
    db.query(sql, callback);
  },

   searchByName: (name, callBack) => {
      
      const sql = `SELECT * FROM products WHERE LOWER(TRIM(name)) LIKE ?`;
      db.query(sql, [`%${name.toLowerCase()}%`], callBack);
   }

};


module.exports = productModel;