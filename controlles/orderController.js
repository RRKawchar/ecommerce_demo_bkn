const orderModel = require('../models/orderModel');

exports.createOrder = (req, res) => {

  const { customer_id, items, shipping, total_amount } = req.body;


  if (!customer_id || !items || items.length === 0 || !shipping) {
    return res.status(400).json({ message: "Missing order data" });
  }


  orderModel.createOrder(customer_id, total_amount, (err, result) => {
    if (err) return res.status(500).json({ message: "Order creation failed", error: err });

    const orderId = result.insertId;
    const itemValues = items.map(item => [orderId, item.product_id, item.quantity, item.price]);

    orderModel.createOrederItems(itemValues, (err2) => {
      if (err2) return res.status(500).json({ message: "Order items insert failed", error: err2 });

      const {
        recipient_name, phone, email, address_line1, address_line2, city,
        postal_code, country, shipping_method
      } = shipping;

      orderModel.createShipping(orderId, recipient_name, phone, email, address_line1, address_line2, city, postal_code, country, shipping_method, (err3) => {
        if (err3) return res.status(500).json({ message: "Shipping details insert failed", error: err3 });

        res.status(201).json({ message: "Order placed successfully", order_id: orderId });
      });

    });
  });


};


exports.getAllOrder = (req, res) => {
  orderModel.getAllOrder((err, result) => {
    if (err) return res.status(500).json({ message: "Order getting failed", error: err });

    const orderData = {};

    result.forEach(element => {
      if (!orderData[element.orderId]) {
        orderData[element.orderId] = {
          orderId: element.orderId,
          customerId: element.customer_id,
          customerName: element.customerName,
          totalAmount: element.total_amount,
          status: element.status,
          createAt: element.create_at,
          items: [],
           shipping: {
            recipientName: element.recipient_name,
            phone: element.phone,
            email: element.email,
            address_line1: element.address_line1,
            address_line2: element.address_line2,
            city: element.city,
            country: element.country,
            postalCode: element.postal_code,
            shipping_method: element.shipping_method,
          }

        };
      }
      orderData[element.orderId].items.push({
        product_id: element.product_id,
        productName: element.productName,
        productDescription: element.productDescription,
        quantity: element.quantity,
        price: element.price
      });


    });



    const allOrders = Object.values(orderData);
    res.json(allOrders);

  });

};



exports.orderByCustomer=(req,res)=>{
  const customerId=req.query.customer_id;
  if(!customerId){
     return res.status(400).json({ message: "Customer id not found"});
  }
 
  orderModel.orderByUser(customerId,(err,result)=>{
      if (err) return res.status(500).json({ message: "Order getting failed", error: err });

      const orderData={};

      result.forEach((element)=>{
        if (!orderData[element.orderId]) {
          orderData[element.orderId] = {
            orderId: element.orderId,
            customerId: element.customer_id,
            customerName: element.customerName,
            totalAmount: element.total_amount,
            status: element.status,
            createAt: element.created_at,
            items: [],
            shipping: {
              recipientName: element.recipient_name,
              phone: element.phone,
              email: element.email,
              address_line1: element.address_line1,
              address_line2: element.address_line2,
              city: element.city,
              country: element.country,
              postalCode: element.postal_code,
              shipping_method: element.shipping_method,
            }
          };
        }

          orderData[element.orderId].items.push({
          product_id: element.product_id,
          productName: element.productName,
          productDescription: element.productDescription,
          quantity: element.quantity,
          price: element.price
        });

      });

       const allOrders = Object.values(orderData);
       res.json(allOrders);

  });


};


exports.updateOrder=(req,res)=>{
  const orderId=req.query.id;
  const {status}=req.body;
  orderModel.updateOrder(status,orderId,(err,result)=>{
     if(err){
        console.log(`Error check : ${err}`);
      return res.status(500).json({ message: "Order getting failed", error: err });
     }

   res.json({
     statusCode:201,
     message:"Order updated successfully!",
   });
  });
};


exports.updateShipping=(req,res)=>{

  const orderId=req.query.order_id;

  if(!orderId)return res.status(400).send({message:"Order id is required"});

  const {recipient_name, phone,
       email, address_line1, address_line2, 
       city, postal_code, country, shipping_method} =req.body;

      if(!recipient_name|| !phone || !email || !address_line1 || !city || !postal_code || !country || !shipping_method){
        return res.status(500).send({
         message:"All field are required!"
        });
      }

      orderModel.updateShipping(
        recipient_name, phone,
       email, address_line1, address_line2, 
       city, postal_code, country, shipping_method,orderId,(err,result)=>{
         if(err){
         console.log(`Error check : ${err}`);
         return res.status(500).json({ message: "Internal Sever Error", error: err });
        }

        
        res.status(201).send({
               statusCode:201,
               message: "Shipping details updated successfully",
        });


      });
};