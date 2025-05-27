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
  const sql = `
    SELECT 
      products.id AS product_id,
      products.name,
      products.category_id,
      products.description,
      products.price,
      products.stock_quantity,
      product_images.id AS image_id,
      product_images.product_id AS image_product_id,
      product_images.image_path
    FROM products
    LEFT JOIN product_images ON products.id = product_images.product_id
    WHERE products.name LIKE ?;
  `;

  db.query(sql, [`%${name.toLowerCase()}%`], callBack);
},




searchByCategoryId:(category_id,callBack)=>{
    
 const sql = `
    SELECT 
      products.id AS product_id,
      products.name,
      products.category_id,
      products.description,
      products.price,
      products.stock_quantity,
      product_images.id AS image_id,
      product_images.product_id AS image_product_id,
      product_images.image_path
    FROM products
    LEFT JOIN product_images ON products.id = product_images.product_id
    WHERE products.category_id LIKE ?;
  `;

  db.query(sql,[category_id],callBack);

},



update:(product_id,name,description,price,stock_quantity,callBack)=>{
   const updateSql=`UPDATE products SET name=?,description=?,price=?,stock_quantity=? WHERE id=?`;
  db.query(updateSql,[product_id,name,description,price,stock_quantity],callBack);
},

deleteImagesByProductId: (product_id, callback) => {
  const sql = `DELETE FROM product_images WHERE product_id = ?`;
  db.query(sql, [product_id], callback);
},


deleteProductById:(product_id,callBack)=>{
  const deleteSql=`DELETE FROM products WHERE id = ? `;
  db.query(deleteSql,[product_id],callBack);
},


};






module.exports = productModel;