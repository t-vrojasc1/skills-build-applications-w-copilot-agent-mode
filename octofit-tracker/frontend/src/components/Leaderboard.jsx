import { useEffect, useState } from 'react';
import { apiBase } from '../api';

const fallbackLeaderboard = [
  { user: 'Mona', points: 470, rank: 1 },
  { user: 'Atlas', points: 370, rank: 2 },
  { user: 'Nova', points: 260, rank: 3 },
  { user: 'Sol', points: 180, rank: 4 },
];

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(fallbackLeaderboard);

  useEffect(() => {
    fetch(`${apiBase}/api/leaderboard/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch leaderboard');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLeaderboard(data);
        }
      })
      .catch(() => setLeaderboard(fallbackLeaderboard));
  }, []);

  return (
    <section className="panel">
      <div className="resource-header">
        <h2>Leaderboard</h2>
        <span className="badge">Top 4</span>
      </div>
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
            {leaderboard.map((entry) => (
              <tr key={entry.user || entry.rank}>
                <td>#{entry.rank || 0}</td>
                <td>{entry.user || 'Unknown athlete'}</td>
                <td>{entry.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
