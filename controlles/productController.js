const productModel=require('../models/productModel');

exports.createProduct=(req,res)=>{

    const {category_id,name,description,price,stock_quantity,image_url}=req.body;

    if(!category_id){
        return res.status(404).send({
           message:"Category Id is required"
        });
    }
    if(!name){
        return res.status(404).send({
           message:"Product name is required"
        });
    }

    if(!price){
        return res.status(404).send({
           message:"Product price is required"
        });
    }
     if(!stock_quantity){
        return res.status(404).send({
           message:"Stock quantity is required"
        });
    }

    productModel.create(category_id,name,description,price,stock_quantity,image_url,(err,result)=>{
       
          if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    }

    res.status(201).send({
        statusCode:201,
        message:"Product added successfully",
        data:result[0]
    })
    });
    

};



exports.getAll=(req,res)=>{

    productModel.getAll((err,resutl)=>{
        if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    }

res.json({
       statusCode:200,
        data : resutl
})

    // res.status(200).send({
    //     statusCode:200,
    //     data : resutl
    // });
    });

};