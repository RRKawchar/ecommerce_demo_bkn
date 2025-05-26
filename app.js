const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./config/db');
const path = require('path');
const fs = require('fs-extra');



// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const customerRoutes = require('./routes/customer.routes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');


app.use(express.json());

app.use('/api/v1', customerRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', productRoutes);


app.listen(process.env.PORT, () => {
    console.log(`server is running on localhost:${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}/api/v1`);
})
