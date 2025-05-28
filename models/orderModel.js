const db=require('../config/db');

const orderModel={
    createOrder:(customer_id,total_amount,callBack)=>{
       const sql=`INSERT INTO orders(customer_id,total_amount) VALUES(?,?)`;
       db.query(sql,[customer_id,total_amount],callBack);
    },

    createOrederItems:(items,callBack)=>{
      const sql=`INSERT INTO order_items(order_id,product_id,quantity,price) VALUES ?`;
      db.query(sql,[items],callBack);
    },

    // createShipping:(order_id, recipient_name, phone,email, address_line1, address_line2, city, postal_code, country, shipping_method,callBack)=>{
    //   const sql=`INSERT INTO order_items(order_id, recipient_name, phone,email, address_line1, address_line2, city, postal_code, country, shipping_method)
    //    VALUES(?,?,?,?,?,?,?,?,?,?)`;
    //   db.query(sql,[order_id, recipient_name, phone, email, address_line1, address_line2, city, postal_code, country, shipping_method],callBack);
    // },

    createShipping: (order_id,recipient_name,phone,email,address_line1,address_line2,city, postal_code,country,shipping_method,callBack) => {
  const sql = `
    INSERT INTO shipping_details(order_id, recipient_name, phone, email, address_line1, address_line2, city, postal_code, country, shipping_method)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql,[order_id,recipient_name, phone,email,address_line1,address_line2,city,postal_code,country,shipping_method,],callBack);
   }

};


module.exports=orderModel;


