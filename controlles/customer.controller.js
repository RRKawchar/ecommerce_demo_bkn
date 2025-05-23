const customerModel = require('../models/customer.model');

exports.createCustomer = (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).send({
      statusCode: 400,
      message: "Please provide customer details"
    });
  }



  customerModel.create(name, email, password, phone, address, (err, result) => {

    if (err) {
      console.error(err);

      // Handle duplicate email error
      if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('email')) {
        return res.status(409).send({
          statusCode: 409,
          message: "Email already exists"
        });
      }

      return res.status(500).send({
        statusCode: 500,
        message: "Internal server error"
      });
    }


    res.status(201).send({
      statusCode: 201,
      message: "Customer created successfully",
      data: result[0]
    });

  });
};


exports.updateCustomer=(req,res) =>{
  const customerId=req.query.customer_id;
  const {name,phone,password,address}=req.body;

   if (!customerId) {
    return res.status(400).json({ message: 'customer_id is required' });
  }

  customerModel.updateCustomer(customerId,name,phone,password,address,(err,result)=>{
       if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error"
      });
    }

   res.status(201).send({
    statusCode:201,
    message:"Customer update successfully",
    data:result[0]
   })

  });

}


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

exports.searchCustomerById = (req, res) => {
  const customerId = req.query.customer_id;

  if (!customerId) {
    return res.status(400).json({ message: 'customer_id is required' });
  }

  customerModel.serchById(customerId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error'
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Customer not found'
      });
    }

    res.json({ data: result[0] });
  });
};


exports.searchCustomerByName = (req, res) => {
  const customerName = req.query.name;

  if (!customerName) {
    return res.status(400).json({ message: 'Name is required' });
  }

  customerModel.searchByname(customerName, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error'
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Customer not found'
      });
    }

    res.json({ data: result });
  });
};


exports.deleteCustomer=(req,res)=>{
 const customerId=req.query.customer_id;

 if(!customerId){
  return res.status(400).send({
    message:"Customer Id required"
  });
 }

 customerModel.deleteCustomer(customerId,(err,result)=>{
   if (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error'
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Customer not found'
      });
    }

    res.status(200).send({
      statusCode:200,
      message:"Customer deleted successfully"
    })
 });

};

