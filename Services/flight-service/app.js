const express = require('express');
const flightRoutes = require('./routes/flight.routes');
const connectDB = require('./config/db');

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send(' First project demo successful. Next Time i make more improvements ');
});

// Flight routes
app.use('/api/v1/flights', flightRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(' Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Flight service running at http://localhost:${PORT}`);
});
