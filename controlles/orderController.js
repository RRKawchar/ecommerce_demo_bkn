const orderModel=require('../models/orderModel');

exports.createOrder=(req,res)=>{
  
    const {customer_id, items, shipping, total_amount}=req.body;
     
    
  if (!customer_id || !items || items.length === 0 || !shipping) {
    return res.status(400).json({ message: "Missing order data" });
  }


  orderModel.createOrder(customer_id,total_amount,(err,result)=>{
        if (err) return res.status(500).json({ message: "Order creation failed", error: err });

        const orderId = result.insertId;
         const itemValues = items.map(item => [orderId, item.product_id, item.quantity, item.price]);

      orderModel.createOrederItems(itemValues, (err2) => {
         if (err2) return res.status(500).json({ message: "Order items insert failed", error: err2 });

         const {
        recipient_name, phone, email, address_line1, address_line2, city,
        postal_code, country, shipping_method
      } = shipping;

      orderModel.createShipping(orderId, recipient_name, phone,email, address_line1, address_line2, city, postal_code, country, shipping_method,(err3)=>{
      if (err3) return res.status(500).json({ message: "Shipping details insert failed", error: err3 });

       res.status(201).json({ message: "Order placed successfully", order_id: orderId });
      });

         });
  });


};