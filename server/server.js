const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.routes');
const visitorRoutes = require('./routes/visitor.routes');
const productRoutes = require('./routes/product.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Serve static files from Angular dist folder
app.use(express.static(path.join(__dirname, '../dist/print-me/browser')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/visitor', visitorRoutes);
app.use('/api/product', productRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Catch-all route for Angular client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/print-me/browser/index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://sinnerman:sinnerman@cluster0.mqepi.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
