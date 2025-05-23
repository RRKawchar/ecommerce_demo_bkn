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

    serchById:(customer_id,callback)=>{
       const sql = 'SELECT * FROM Customers WHERE customer_id = ?';
      db.query(sql,[customer_id],callback);
    },

    searchByname:(name,callback)=>{
       const sql = 'SELECT * FROM Customers WHERE LOWER(TRIM(name)) LIKE ? ';
      db.query(sql,[`%${name.toLowerCase()}%`],callback);
    },

    updateCustomer:(customer_id,name,phone,password,address,callback)=>{
      const sql = `UPDATE Customers SET name=?,phone=?,password=?,address=? WHERE customer_id=?`;
      db.query(sql,[name,phone,password,address,customer_id],callback);
    },

    deleteCustomer:(customer_id,callback)=>{
      const sql=`DELETE FROM Customers WHERE customer_id=?`;
      db.query(sql,[customer_id],callback);
    }
 
 };

 module.exports=customerModel;