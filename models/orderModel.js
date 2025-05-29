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

    createShipping: (order_id,recipient_name,phone,email,address_line1,address_line2,city, postal_code,country,shipping_method,callBack) => {
  const sql = `
    INSERT INTO shipping_details(order_id, recipient_name, phone, email, address_line1, address_line2, city, postal_code, country, shipping_method)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql,[order_id,recipient_name, phone,email,address_line1,address_line2,city,postal_code,country,shipping_method,],callBack);
   },


   getAllOrder:(callBack)=>{
      const sql=`SELECT 
           orders.id as orderId,
           orders.customer_id,
           Customers.name as customerName,
           orders.total_amount,
           orders.status,
           orders.created_at,
           products.name as productName,
           products.id as product_id,
           products.description as productDescription,
           order_items.quantity,
           order_items.price,

           shipping_details.recipient_name,
           shipping_details.phone,
           shipping_details.email,
           shipping_details.address_line1,
           shipping_details.address_line2,
          shipping_details.city,
          shipping_details.postal_code,
          shipping_details.country,
          shipping_details.shipping_method
          
          FROM orders
          JOIN Customers ON orders.customer_id=Customers.customer_id
          JOIN order_items ON orders.id = order_items.order_id
          JOIN products ON order_items.product_id = products.id
          JOIN shipping_details ON orders.id=shipping_details.order_id
          
      `;

      db.query(sql,callBack);

   }

};


module.exports=orderModel;


