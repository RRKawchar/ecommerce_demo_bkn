const categoryModel=require('../models/category.model');

exports.createCategory=(req,res)=>{
    const {name,description} = req.body;
    if(!name){
        return res.status(400).send({
            statusCode:400,
            message:"Please provide category name"
        });
    }

    categoryModel.create(name,description,(err,result)=>{
      if(err){
        console.error(err);
        return res.status(500).send({
            statusCode:500,
            message:"Internal server error"
        });
      }

     res.status(201).send({
        statusCode:201,
        message:"Category created successfully",
         data : result[0]
     });

    });


};

exports.getCategories = (req, res) => {
  categoryModel.getAll((err, result) => {
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


exports.searchCategoryByName= (req,res)=>{
   const productName=req.query.name;

    categoryModel.searchCategoryByName(productName,(err,result)=>{

      if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    }

   res.json({data:result})

    });

};


