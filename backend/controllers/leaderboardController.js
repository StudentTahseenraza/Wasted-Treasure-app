const resetLeaderboard = async (req, res) => {
    try {
      await User.updateMany({}, { $set: { totalPoints: 0, badge: 'None' } });
      res.status(200).json({ message: 'Leaderboard reset successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { resetLeaderboard };