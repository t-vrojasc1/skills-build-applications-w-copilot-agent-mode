import { useEffect, useState } from 'react';
import { apiBase } from '../api';

const fallbackWorkouts = [
  { name: 'Tempo Run', difficulty: 'intermediate', durationMinutes: 30 },
  { name: 'Core Blast', difficulty: 'beginner', durationMinutes: 20 },
  { name: 'Hill Repeats', difficulty: 'advanced', durationMinutes: 45 },
  { name: 'Recovery Flow', difficulty: 'beginner', durationMinutes: 15 },
];

export default function Workouts() {
  const [workouts, setWorkouts] = useState(fallbackWorkouts);

  useEffect(() => {
    fetch(`${apiBase}/api/workouts/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch workouts');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setWorkouts(data);
        }
      })
      .catch(() => setWorkouts(fallbackWorkouts));
  }, []);

  return (
    <section className="panel">
      <div className="resource-header">
        <h2>Workouts</h2>
        <span className="badge">{workouts.length} plans</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Workout</th>
              <th>Difficulty</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.name}>
                <td>{workout.name}</td>
                <td>{workout.difficulty || 'beginner'}</td>
                <td>{workout.durationMinutes ?? 0} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
