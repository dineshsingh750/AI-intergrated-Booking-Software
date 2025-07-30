const mongoose = require('mongoose');

// Flight Schema Definition
const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: [true, 'Airline name is required'],
      trim: true,
    },
    flightNumber: {
      type: String,
      required: [true, 'Flight number is required'],
      unique: true,
      uppercase: true,
    },
    departureCity: {
      type: String,
      required: [true, 'Departure city is required'],
      trim: true,
    },
    arrivalCity: {
      type: String,
      required: [true, 'Arrival city is required'],
      trim: true,
    },
    departureTime: {
      type: Date,
      required: [true, 'Departure time is required'],
    },
    arrivalTime: {
      type: Date,
      required: [true, 'Arrival time is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    seatsAvailable: {
      type: Number,
      required: [true, 'Seats available is required'],
      min: [0, 'Seats available must be positive'],
    },
    isInternational: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['on-time', 'delayed', 'cancelled'],
      default: 'on-time',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Export the model
module.exports = mongoose.model('Flight', flightSchema);
