import { useEffect, useState } from 'react';
import { apiBase } from '../api';

const initialForm = {
  user: '',
  type: 'run',
  durationMinutes: '',
};

async function getCollection(path) {
  const response = await fetch(`${apiBase}${path}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Unable to load activity data.');
  }
  return data;
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      getCollection('/api/activities/'),
      getCollection('/api/users/'),
    ])
      .then(([activityData, userData]) => {
        setActivities(activityData);
        setUsers(userData);
        setForm((currentForm) => ({ ...currentForm, user: userData[0]?._id || '' }));
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  async function createActivity(event) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const durationMinutes = Number(form.durationMinutes);
    try {
      const response = await fetch(`${apiBase}/api/activities/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: form.user,
          type: form.type.trim(),
          durationMinutes,
          points: durationMinutes,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to save activity.');
      }

      const athlete = users.find((user) => user._id === data.user);
      setActivities((currentActivities) => [
        { ...data, user: athlete || data.user },
        ...currentActivities,
      ]);
      setForm((currentForm) => ({ ...initialForm, user: currentForm.user }));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <div className="resource-header">
        <h2>Activities</h2>
        <span className="badge">{activities.length} logs</span>
      </div>

      <form className="row g-3 mb-4" onSubmit={createActivity}>
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="activity-user">Athlete</label>
          <select
            className="form-select"
            id="activity-user"
            onChange={(event) => setForm({ ...form, user: event.target.value })}
            required
            value={form.user}
          >
            <option value="" disabled>Select an athlete</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.username}</option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label" htmlFor="activity-type">Activity</label>
          <select
            className="form-select"
            id="activity-type"
            onChange={(event) => setForm({ ...form, type: event.target.value })}
            value={form.type}
          >
            <option value="run">Run</option>
            <option value="walk">Walk</option>
            <option value="cycling">Cycling</option>
            <option value="strength">Strength</option>
            <option value="mobility">Mobility</option>
          </select>
        </div>
        <div className="col-12 col-md-2">
          <label className="form-label" htmlFor="duration-minutes">Minutes</label>
          <input
            className="form-control"
            id="duration-minutes"
            min="1"
            onChange={(event) => setForm({ ...form, durationMinutes: event.target.value })}
            required
            type="number"
            value={form.durationMinutes}
          />
        </div>
        <div className="col-12 col-md-3 d-flex align-items-end justify-content-between gap-3">
          <small className="text-secondary">1 point per minute</small>
          <button className="btn btn-primary" disabled={saving || users.length === 0} type="submit">
            {saving ? 'Saving' : 'Log activity'}
          </button>
        </div>
      </form>

      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      {users.length === 0 && !loading && (
        <p className="alert alert-info" role="status">Create an athlete profile before logging activity.</p>
      )}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Athlete</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4">Loading activities…</td></tr>
            ) : activities.length === 0 ? (
              <tr><td className="empty-state" colSpan="4">No activities recorded yet.</td></tr>
            ) : activities.map((activity) => {
              const athlete = activity.user && typeof activity.user === 'object'
                ? activity.user.username
                : users.find((user) => user._id === activity.user)?.username;

              return (
                <tr key={activity._id}>
                  <td>{athlete || 'Unknown athlete'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.points ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}