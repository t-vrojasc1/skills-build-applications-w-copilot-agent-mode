import { useEffect, useState } from 'react';
import { getCollection } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCollection('/api/teams/', 'Unable to load teams.')
      .then(setTeams)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="panel">
      <div className="resource-header">
        <h2>Teams</h2>
        <span className="badge">{teams.length} squads</span>
      </div>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Team</th>
              <th>Members</th>
              <th>Goal</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3">Loading teams…</td></tr>
            ) : teams.length === 0 ? (
              <tr><td className="empty-state" colSpan="3">No teams yet.</td></tr>
            ) : teams.map((team) => (
              <tr key={team._id || team.name}>
                <td>{team.name}</td>
                <td>{Array.isArray(team.members) ? team.members.length : team.members ?? 0}</td>
                <td>{team.teamGoal || 'Stay active together'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
