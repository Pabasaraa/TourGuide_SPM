const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8070;

const paymentRoute = require('./routes/payment-route');

app.use(cors());
app.use(bodyParser.json());
app.use(paymentRoute);

const URL = process.env.MONGO_URL;

mongoose.connect(URL, {useNewUrlParser : true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection Success!');
});

app.use("/payment", paymentRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})