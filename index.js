const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();    
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require("./routes/cart");
const orderRouter = require('./routes/order');
const stripeRouter = require('./routes/stripe');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose
.connect(
    process.env.MONGO_URL,
)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/carts', cartRouter);
app.use("/api/checkout" ,stripeRouter); 

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port 5000');
});