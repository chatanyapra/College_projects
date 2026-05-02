const express = require('express');
const mongoose = require('mongoose');
const { router } = require('./routes/route.js');
const app = express();
require('dotenv').config();
app.use(express.json());

const port = process.env.PORT || 3001;

app.use('/', router);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Mongodb connect"))
    .catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => {
    console.log("Server running on port", port);
})
