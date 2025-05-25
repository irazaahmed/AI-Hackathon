require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const idCardRoutes = require('./routes/idCardRoutes');
const faqRoutes = require('./routes/faqRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/id-cards', idCardRoutes);
app.use('/api/faqs', faqRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error("MongoDB Connection Error",err));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));