
const cartModel=require('../models/cartModel');

exports.createCartItems=(req,res)=>{

    const {customer_id,product_id,quantity}=req.body;
    if(!customer_id){
        return res.status(404).send({
          statusCode:404,
           message:"User id not found!"
        });
    }


    cartModel.create(customer_id,product_id,quantity,(err,result)=>{
      
        if(err){
            console.error(err);
            return res.status(500).send({
                message:"Internal server error",
            });
        }

        res.json({
            statusCode:201,
            message:"Cart item added successfully",
            data:result[0]
        })

    });


};


exports.getAllCartItem=(req,res)=>{
   const customer_id=req.query.customer_id;

     if (!customer_id) {
       return res.status(400).json({ message: "Customer ID is required" });
      }


  cartModel.getAll(customer_id,(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send({
                message:"Internal server error",
            });
        }

            const grouped = {};
            result.forEach(element => {
               if(!grouped[element.cart_item_id]){
                grouped[element.cart_item_id]={
                    cart_item_id:element.cart_item_id,
                    quantity:element.quantity,
                    product:{
                        id:element.product_id,
                        name:element.name,
                        description:element.description,
                        price:element.price,
                        images:[]
                    }
                };
               } 
              if(element.image_path){
                grouped[element.cart_item_id].product.images.push(
                    `${req.protocol}://${req.get('host')}/${element.image_path.replace(/\\/g, '/')}`
                );
              }

            });
        res.json(Object.values(grouped));

  });
};

  exports.updateCart=(req,res)=>{
      const cart_item_id=req.query.id;
       const {quantity}=req.body;
       if (!cart_item_id) {
       return res.status(400).json({ message: "Cart ID is required" });
      }

      cartModel.update(quantity,cart_item_id,(err,result)=>{
       if(err){
            console.error(err);
            return res.status(500).send({
                message:"Internal server error",
            });
        }

        res.status(201).send({
            statusCode:201,
            message:"Quantity updated successfully",
        });
      });
  };


  exports.deleteCart=(req,res)=>{
     const cartId=req.query.id;
     if (!cartId) {
       return res.status(400).json({ message: "Cart ID is required" });
      }
     cartModel.delete(cartId,(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send({
                message:"Internal server error",
            });
        }


        res.status(201).send({
            statusCode:201,
            message:"Cart item deleted successfully"
        });
     });
  };