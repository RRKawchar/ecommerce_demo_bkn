const categoryModel=require('../models/categoryModel');

exports.createCategory = (req,res)=>{
     const {name,description} = req.body;
     if(!name){
        return res.status(400).send({
            message:"Category name is required"
        });
     }
categoryModel.create(name,description,(err,result)=>{
     if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    }

    res.status(201).send({
        statusCode:201,
        message:"Category added successfully",
        categoryId:result.insertId
    });
});
};


exports.getAllCategory=(req,res)=>{
    categoryModel.getAll((err,result)=>{
        if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    } 

    res.json({
        data:result
    })
    });
};


exports.searchById=(req,res)=>{

    const catId=req.query.id;

    if(!catId){
        return res.status(404).send({
            statusCode:404,
            message:"Category Id is required"
        });
    }

    categoryModel.searchById(catId,(err,result)=>{
      if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    } 
    
    if(result.length==0){
        return res.status(404).send({
            statusCode:404,
            message:"Data not found by the id"
        });
    }

    res.json({
        data:result[0]
    });
    });
    

};


exports.searchByName=(req,res)=>{

    const categoryName=req.query.name;

    if(!categoryName){
        return res.status(404).send({
            statusCode:404,
            message:"Enter category name"
        });
    }

    categoryModel.searchByName(categoryName,(err,result)=>{
      if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    } 
    
    if(result.length==0){
        return res.status(404).send({
            statusCode:404,
            message:"Data not found"
        });
    }

    res.json({
        data:result
    });
    });
    

};


exports.delete=(req,res)=>{

    const categoryId=req.query.id;

    if(!categoryId){
        return res.status(404).send({
            statusCode:404,
            message:"Category Id is required"
        });
    }

    categoryModel.delete(categoryId,(err,result)=>{
      if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    } 
    
    if(result.length==0){
        return res.status(404).send({
            statusCode:404,
            message:"Data not found"
        });
    }

   res.status(201).send({
     statusCode:201,
     message:"Category delete successfully"
   });

    });
    

};


exports.update=(req,res)=>{

    const categoryId=req.query.id;
    const {name,description}=req.body;

    if(!categoryId){
        return res.status(404).send({
            statusCode:404,
            message:"Category Id is required"
        });
    }

    categoryModel.update(name,description,categoryId,(err,result)=>{
      if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    } 
    
    if(result.length==0){
        return res.status(404).send({
            statusCode:404,
            message:"Data not found"
        });
    }

   res.status(201).send({
     statusCode:201,
     message:"Category update successfully",
     data:result[0]
   });

    });
    

};