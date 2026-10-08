import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const logo = '/octofitapp-small.png';

const navigation = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Overview() {
  return (
    <section className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="panel hero-panel">
            <div>
              <span className="eyebrow">Weekly momentum</span>
              <h2>Keep every student moving.</h2>
              <p>
                OctoFit Tracker helps students log workouts, build healthy habits, and work together toward
                team challenges.
              </p>
            </div>
            <div className="hero-stats">
              <div>
                <strong>1,248</strong>
                <span>Active minutes</span>
              </div>
              <div>
                <strong>86%</strong>
                <span>Goal streak</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="panel summary-panel">
            <span className="eyebrow">This week</span>
            <h3>Top performers</h3>
            <ul className="summary-list">
              <li><span>Mona</span><strong>470 pts</strong></li>
              <li><span>Atlas</span><strong>370 pts</strong></li>
              <li><span>Nova</span><strong>260 pts</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="Octofit tracker logo" className="brand-logo" />
          <div>
            <span className="eyebrow">Mergington High</span>
            <h1>OctoFit Tracker</h1>
          </div>
        </div>
        <nav className="nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
