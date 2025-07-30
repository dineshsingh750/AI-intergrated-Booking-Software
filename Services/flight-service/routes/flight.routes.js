const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flight.controller');

//  Health Check (Basic Monitoring)
router.get('/health', (req, res) => {
  res.status(200).json({ status: ' Flight service is running fine!' });
});

// Search / Filter Routes (Specific first)
router.get('/departure/city/:city', flightController.getFlightsByDepartureCity);  // 6
router.get('/arrival/city/:city', flightController.getFlightsByArrivalCity);      // 7
router.get('/status/:status', flightController.getFlightsByStatus);               // 8
router.get('/filter/price', flightController.getFlightsByPriceRange);             // 9
router.get('/international', flightController.getInternationalFlights);           // 11
router.get('/domestic', flightController.getDomesticFlights);                     // 12
router.get('/available', flightController.getAvailableFlights);                   // 13
router.get('/airline/:airline', flightController.getFlightsByAirline);            // 17

//  Seat Operations (REST-style)
router.patch('/:id/book', flightController.bookSeat);     // 14
router.patch('/:id/cancel', flightController.cancelSeat); // 15

//  Flight Status Update
router.patch('/:id/status', flightController.updateFlightStatus); // 10

//  Stats & Admin
router.get('/stats/count', flightController.countFlights);               // 16
router.delete('/admin/bulk-delete', flightController.bulkDeleteFlights); // 18

//  Pagination & Sorting
router.get('/paginate/list', flightController.paginateFlights); // 19
router.get('/sort', flightController.sortFlights);              // 20

//  Core CRUD Routes (Kept at the end to avoid route conflicts)
router.post('/', flightController.createFlight);         // 1
router.get('/', flightController.getAllFlights);         // 2
router.get('/:id', flightController.getFlightById);      // 3
router.put('/:id', flightController.updateFlight);       // 4
router.delete('/:id', flightController.deleteFlight);    // 5

module.exports = router;
