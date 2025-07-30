const Flight = require('../models/flight.model');

// Controller for Flight-related actions
const flightController = {
  // 1. Create a new flight
  createFlight: async (req, res) => {
    try {
      const flight = new Flight(req.body);
      await flight.save();
      res.status(201).json(flight);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // 2. Get all flights
  getAllFlights: async (req, res) => {
    try {
      const flights = await Flight.find();
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 3. Get a flight by ID
  getFlightById: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) return res.status(404).json({ message: 'Flight not found' });
      res.status(200).json(flight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 4. Update a flight by ID
  updateFlight: async (req, res) => {
    try {
      const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!flight) return res.status(404).json({ message: 'Flight not found' });
      res.status(200).json(flight);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // 5. Delete a flight
  deleteFlight: async (req, res) => {
    try {
      const flight = await Flight.findByIdAndDelete(req.params.id);
      if (!flight) return res.status(404).json({ message: 'Flight not found' });
      res.status(200).json({ message: 'Flight deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 6. Search flights by departure city
  getFlightsByDepartureCity: async (req, res) => {
    try {
      const flights = await Flight.find({ departureCity: req.params.city });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 7. Search flights by arrival city
  getFlightsByArrivalCity: async (req, res) => {
    try {
      const flights = await Flight.find({ arrivalCity: req.params.city });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 8. Search flights by status
  getFlightsByStatus: async (req, res) => {
    try {
      const flights = await Flight.find({ status: req.params.status });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 9. Filter flights by price range
  getFlightsByPriceRange: async (req, res) => {
    const { min, max } = req.query;
    try {
      const flights = await Flight.find({
        price: { $gte: min, $lte: max },
      });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 10. Update flight status (e.g., delayed, on-time)
  updateFlightStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const flight = await Flight.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!flight) return res.status(404).json({ message: 'Flight not found' });
      res.status(200).json(flight);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // 11. Get international flights only
  getInternationalFlights: async (req, res) => {
    try {
      const flights = await Flight.find({ isInternational: true });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 12. Get domestic flights only
  getDomesticFlights: async (req, res) => {
    try {
      const flights = await Flight.find({ isInternational: false });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 13. Get available flights (seats > 0)
  getAvailableFlights: async (req, res) => {
    try {
      const flights = await Flight.find({ seatsAvailable: { $gt: 0 } });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 14. Book a seat (decrease seat count by 1)
  bookSeat: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight || flight.seatsAvailable < 1) {
        return res.status(400).json({ message: 'No seats available' });
      }
      flight.seatsAvailable -= 1;
      await flight.save();
      res.status(200).json({ message: 'Seat booked', flight });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 15. Cancel seat booking (increase seat count by 1)
  cancelSeat: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }
      flight.seatsAvailable += 1;
      await flight.save();
      res.status(200).json({ message: 'Booking cancelled', flight });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 16. Count total flights
  countFlights: async (req, res) => {
    try {
      const count = await Flight.countDocuments();
      res.status(200).json({ totalFlights: count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 17. Get flights by airline
  getFlightsByAirline: async (req, res) => {
    try {
      const flights = await Flight.find({ airline: req.params.airline });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 18. Bulk delete flights (e.g., for admin testing)
  bulkDeleteFlights: async (req, res) => {
    try {
      const result = await Flight.deleteMany({});
      res.status(200).json({ message: 'All flights deleted', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 19. Pagination for flight list
  paginateFlights: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
      const flights = await Flight.find()
        .skip((page - 1) * limit)
        .limit(limit);
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 20. Sort flights by price or time
  sortFlights: async (req, res) => {
    const { sortBy = 'price', order = 'asc' } = req.query;
    const sortOption = {};
    sortOption[sortBy] = order === 'asc' ? 1 : -1;

    try {
      const flights = await Flight.find().sort(sortOption);
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = flightController;
