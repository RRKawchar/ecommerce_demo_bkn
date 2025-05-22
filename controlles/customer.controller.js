const customerModel=require('../models/customer.model');

exports.createCustomer=(req,res)=>{
    const {name,email,password,phone,address} = req.body;
    if(!name || !email || !password || !phone){
        return res.status(400).send({
            statusCode:400,
            message:"Please provide customer details"
        });
    }

  


    customerModel.create(name,email,password,phone,address,(err,result)=>{
      if(err){
        console.error(err);
        return res.status(500).send({
            statusCode:500,
            message:"Internal server error"
        });
      }

     res.status(201).send({
        statusCode:201,
        message:"Customer created successfully",
         data : result[0]
     });

    });


};

exports.getAllCustomer = (req, res) => {
    customerModel.getAll((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    }

    res.json({ data: result });
  });
};
