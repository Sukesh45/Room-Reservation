const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');

// Sample database of reservations
let reservations = [];

app.use(express.json());
app.use(cors());

// Get all reservations
app.get('/reservations', (req, res) => {
  res.json(reservations);
});

// Get a specific reservation by ID
app.get('/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  const reservation = reservations.find(reservation => reservation.id === reservationId);
  if (!reservation) {
    return res.status(404).json({ message: 'Reservation not found' });
  }
  res.json(reservation);
});

// Create a new reservation
app.post('/reservations', (req, res) => {
  const { roomNumber, checkInDate, checkOutDate } = req.body;
  const newReservation = { id: Date.now().toString(), roomNumber, checkInDate, checkOutDate };
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

// Update an existing reservation
app.put('/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  const { roomNumber, checkInDate, checkOutDate } = req.body;
  const reservationIndex = reservations.findIndex(reservation => reservation.id === reservationId);
  if (reservationIndex === -1) {
    return res.status(404).json({ message: 'Reservation not found' });
  }
  reservations[reservationIndex] = { ...reservations[reservationIndex], roomNumber, checkInDate, checkOutDate };
  res.json(reservations[reservationIndex]);
});

// Delete an existing reservation
app.delete('/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  reservations = reservations.filter(reservation => reservation.id !== reservationId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
