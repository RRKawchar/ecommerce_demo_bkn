const db=require('../config/db');

const productModel={
     create:(category_id,name,description,price,stock_quantity,image_url,callBack)=>{
        const sql=`INSERT INTO products(category_id,name,description,price,stock_quantity,image_url) VALUES(?,?,?,?,?,?)`;
        db.query(sql,[category_id,name,description,price,stock_quantity,image_url],callBack);
     },

   getAll:(callBack)=>{
         const sql=`SELECT * FROM products`;
         db.query(sql,callBack);
      },

};


module.exports=productModel;