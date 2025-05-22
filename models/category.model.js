// const db=require('../config/db');

// const categoryModel={
//    create:(name,description,callback)=>{
//     const sql=`insert into categories(name,description) values(?,?)`;
//     db.query(sql,[name,description],callback);
//    },

//    getAll:(callback)=>{
//      const sql=`select * from categories`;
//      db.query(sql,callback);
//    },

//    searchCategoryByName:(name,callback)=>{
//     const sql=`select * from categories where lower(trim(name)) like ?`;
//     db.query(sql,[`%${name}%`],callback);
//    }
// };


// module.exports=categoryModel;