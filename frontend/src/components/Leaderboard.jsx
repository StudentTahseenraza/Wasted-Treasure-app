import { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [topDonor, setTopDonor] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        setTopDonor(response.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };
    fetchLeaderboard();
  }, []);

  const shareOnSocialMedia = (rank, name, points, badge) => {
    const message = `I ranked #${rank} on the Wastage Management Leaderboard with ${points} points and a ${badge} badge! 🎉`;
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(message)}`;
    window.open(twitterUrl, '_blank');
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
            <th>Badge</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(topDonor) && topDonor.map((donor, index) => (
            <tr key={donor._id}>
              <td>{index + 1}</td>
              <td>{donor.name}</td>
              <td>{donor.totalPoints}</td>
              <td>
                {donor.badge === 'Gold' && '🥇 Gold'}
                {donor.badge === 'Silver' && '🥈 Silver'}
                {donor.badge === 'Bronze' && '🥉 Bronze'}
                {donor.badge === 'None' && '—'}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => shareOnSocialMedia(index + 1, donor.name, donor.totalPoints, donor.badge)}
                >
                  Share
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;