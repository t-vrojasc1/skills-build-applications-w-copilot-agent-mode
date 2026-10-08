import { useEffect, useState } from 'react';
import { apiBase, getCollection } from '../api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/leaderboard/`)
      .then((response) => getCollection(response, 'Unable to load leaderboard.'))
      .then(setLeaderboard)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="panel">
      <div className="resource-header">
        <h2>Leaderboard</h2>
        <span className="badge">Top {leaderboard.length}</span>
      </div>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3">Loading leaderboard…</td></tr>
            ) : leaderboard.length === 0 ? (
              <tr><td className="empty-state" colSpan="3">No leaderboard entries yet.</td></tr>
            ) : leaderboard.map((entry, index) => {
              const athlete = entry.user && typeof entry.user === 'object'
                ? entry.user.username
                : entry.user;

              return (
                <tr key={entry._id || entry.user?._id || athlete || entry.rank || index}>
                  <td>#{entry.rank ?? index + 1}</td>
                  <td>{athlete || 'Unknown athlete'}</td>
                  <td>{entry.points ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
