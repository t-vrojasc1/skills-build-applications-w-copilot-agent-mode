import { useEffect, useState } from 'react';
import { apiBase, getCollection } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/workouts/`)
      .then((response) => getCollection(response, 'Unable to load workouts.'))
      .then(setWorkouts)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="panel">
      <div className="resource-header">
        <h2>Workouts</h2>
        <span className="badge">{workouts.length} plans</span>
      </div>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
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
            {loading ? (
              <tr><td colSpan="3">Loading workouts…</td></tr>
            ) : workouts.length === 0 ? (
              <tr><td className="empty-state" colSpan="3">No workouts available yet.</td></tr>
            ) : workouts.map((workout) => (
              <tr key={workout._id || workout.name}>
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
