const db=require('../config/db');

const cartModel={

     create:(customer_id,product_id,quantity,callBack)=>{
       const createSql=`INSERT INTO cart_items(customer_id,product_id,quantity) VALUES(?,?,?)`;
       db.query(createSql,[customer_id,product_id,quantity],callBack);
     },

     getAll:(customer_id,callBack)=>{
        const sql=`SELECT 
         ci.id AS cart_item_id,
         ci.quantity,
         p.id AS prouduct_id,
         p.name,
         p.description,
         p.price,
         pi.image_path
        FROM cart_items ci JOIN products p ON ci.product_id=p.id
        LEFT JOIN product_images pi ON p.id=pi.product_id
        WHERE ci.customer_id=?`;

        db.query(sql,[customer_id],callBack);
     },


     update:(cart_item_id,quantity,callBack)=>{
        const sql=`UPDATE cart_items SET quantity=? WHERE id=?`;
        db.query(sql,[cart_item_id,quantity],callBack);
     },


     delete:(id,callBack)=>{
        const sql=`DELETE FROM cart_items WHERE id=?`;
        db.query(sql,[id],callBack);
     }

     

};


module.exports=cartModel;