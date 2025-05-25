const db=require('../config/db');

const CategoryModel={

    create:(name,description,callback)=>{
     const sql = `INSERT INTO categories (name, description) VALUES (?, ?)`;
      db.query(sql,[name,description],callback);
    },

    getAll:(callback)=>{
        const sql =`SELECT * FROM categories`;
        db.query(sql,callback);
    },


    searchById:(id,callback)=>{
        const sql=`SELECT * FROM categories WHERE id=?`;
        db.query(sql,[id],callback);
    },

     searchByName:(name,callback)=>{
        const sql=`SELECT * FROM categories WHERE LOWER(TRIM(name)) LIKE?`;
        db.query(sql,[`%${name.toLowerCase()}%`],callback);
    },

     delete:(id,callback)=>{
        const sql=`DELETE FROM categories WHERE id=?`;
        db.query(sql,[id],callback);
    },

     update:(id,name,description,callback)=>{
        const sql=`UPDATE categories SET name=?,description=? WHERE id=?`;
        db.query(sql,[id,name,description],callback);
    },


}



module.exports=CategoryModel;