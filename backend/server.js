const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const DonationRoutes = require('./routes/DonationRoutes');
const requestRoutes = require('./routes/requestRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/donation', DonationRoutes);
app.use('/api/request', requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const FoodRoutes = require('./routes/FoodRoutes');
app.use('/api/food-donations', FoodRoutes);


const BookRoutes = require('./routes/BookRoutes');
app.use('/api/book-donations', BookRoutes);

const leaderboardRoutes = require('./routes/leaderboardRoutes');
app.use('/api/leaderboard', leaderboardRoutes);

const cron = require('node-cron');
const { resetLeaderboard } = require('./controllers/leaderboardController');

// Schedule leaderboard reset on the first day of every month
cron.schedule('0 0 1 * *', () => {
  console.log('Resetting leaderboard...');
  resetLeaderboard();
});