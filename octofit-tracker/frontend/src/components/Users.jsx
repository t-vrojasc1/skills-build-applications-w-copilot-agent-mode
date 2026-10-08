import { useEffect, useState } from 'react';
import { apiBase, getCollection } from '../api';

const initialForm = {
  username: '',
  email: '',
  fitnessLevel: 'beginner',
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCollection('/api/users/', 'Unable to load athletes.')
      .then(setUsers)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  async function createUser(event) {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`${apiBase}/api/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to create athlete.');
      }

      setUsers((currentUsers) => [data, ...currentUsers]);
      setForm(initialForm);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <div className="resource-header">
        <h2>Athletes</h2>
        <span className="badge">{users.length} profiles</span>
      </div>

      <form className="row g-3 mb-4" onSubmit={createUser}>
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            autoComplete="username"
            className="form-control"
            id="username"
            onChange={(event) => setForm({ ...form, username: event.target.value })}
            required
            value={form.username}
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            autoComplete="email"
            className="form-control"
            id="email"
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
            type="email"
            value={form.email}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label" htmlFor="fitness-level">Fitness level</label>
          <select
            className="form-select"
            id="fitness-level"
            onChange={(event) => setForm({ ...form, fitnessLevel: event.target.value })}
            value={form.fitnessLevel}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="col-12 col-md-1 d-flex align-items-end">
          <button className="btn btn-primary w-100" disabled={saving} type="submit">
            {saving ? 'Saving' : 'Add'}
          </button>
        </div>
      </form>

      {error && <p className="alert alert-danger" role="alert">{error}</p>}

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Username</th>
              <th>Fitness level</th>
              <th>Goals</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3">Loading athletes…</td></tr>
            ) : users.length === 0 ? (
              <tr><td className="empty-state" colSpan="3">No athlete profiles yet.</td></tr>
            ) : users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.fitnessLevel || 'beginner'}</td>
                <td>{user.goals?.join(', ') || 'General wellness'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}