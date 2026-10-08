import { useEffect, useState } from 'react';
import { apiBase } from '../api';

const fallbackTeams = [
  { name: 'Velocity Crew', teamGoal: 'Hit 500 combined active minutes each week', members: 2 },
  { name: 'Core Circuit', teamGoal: 'Build consistency and mobility streaks', members: 2 },
];

export default function Teams() {
  const [teams, setTeams] = useState(fallbackTeams);

  useEffect(() => {
    fetch(`${apiBase}/api/teams/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch teams');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeams(data);
        }
      })
      .catch(() => setTeams(fallbackTeams));
  }, []);

  return (
    <section className="panel">
      <div className="resource-header">
        <h2>Teams</h2>
        <span className="badge">{teams.length} squads</span>
      </div>
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
            {teams.map((team) => (
              <tr key={team.name}>
                <td>{team.name}</td>
                <td>{team.members?.length ?? team.members ?? 0}</td>
                <td>{team.teamGoal || 'Stay active together'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
