const express = require('express');
require('dotenv').config();
const app=express();
// const categoryRoutes=require('./routes/category.routes');
const customerRoutes=require('./routes/customer.routes');
const port=3000;

app.use(express.json());
// app.use('/api/v1',categoryRoutes);
app.use('/api/v1',customerRoutes);




app.listen(port,()=>{
    console.log(`server is running on localhost:${port}`);
})
