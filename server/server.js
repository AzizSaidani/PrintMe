const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.routes');


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);



// Connect to MongoDB
mongoose.connect('mongodb+srv://azizsaidani123:azizsaidani123@cluster0.mqepi.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
