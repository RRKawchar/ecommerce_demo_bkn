const db=require('../config/db');

const customerModel={
    create:(name,email,password,phone,address,callback)=>{
     const sql=`insert into Customers(name,email,password,phone,address) values(?,?,?,?,?)`;
     db.query(sql,[name,email,password,phone,address],callback);
    },
 
    getAll:(callback)=>{
      const sql=`select * from Customers`;
      db.query(sql,callback);
    },
 
 };

 module.exports=customerModel;