const express = require('express');
const dotenv = require('dotenv');
const flightRoutes = require('./routes/flight.routes');
const connectDB = require('./config/db');

dotenv.config(); // Load .env first

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✈️dine like judgement skills i');
});

app.use('/api/v1/flights', flightRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 [UPDATED] Flight service running on http://localhost:${PORT}`);

});
