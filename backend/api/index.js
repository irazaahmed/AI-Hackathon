const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const connectToDatabase = require('./db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');  // adjust path accordingly
const idCardRoutes = require('./routes/idCardRoutes');
const faqRoutes = require('./routes/faqRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/id-cards', idCardRoutes);
app.use('/api/faqs', faqRoutes);
app.use(async (req, res, next) => {
    await connectToDatabase();
    next();
});


app.get('/', (req, res) => {
  res.send('Welcome to the API');
}
);

// MongoDB connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error("MongoDB Error", err));

module.exports = app;
module.exports.handler = serverless(app);
