import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const db = mongoose.connection.db;
    if (db) {
      await db.dropDatabase();
    }

    const users = await User.insertMany([
      {
        username: 'mona',
        email: 'mona@octofit.example',
        firstName: 'Mona',
        lastName: 'Octocat',
        fitnessLevel: 'advanced',
        goals: ['10k steps', 'strength training'],
      },
      {
        username: 'nova',
        email: 'nova@octofit.example',
        firstName: 'Nova',
        lastName: 'Runner',
        fitnessLevel: 'intermediate',
        goals: ['marathon prep', 'mobility'],
      },
      {
        username: 'atlas',
        email: 'atlas@octofit.example',
        firstName: 'Atlas',
        lastName: 'Cyclist',
        fitnessLevel: 'advanced',
        goals: ['endurance rides', 'cadence drills'],
      },
      {
        username: 'sol',
        email: 'sol@octofit.example',
        firstName: 'Sol',
        lastName: 'Stretch',
        fitnessLevel: 'beginner',
        goals: ['habit building', 'recovery'],
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Velocity Crew',
        members: [users[0]._id, users[1]._id],
        teamGoal: 'Hit 500 combined active minutes each week',
      },
      {
        name: 'Core Circuit',
        members: [users[2]._id, users[3]._id],
        teamGoal: 'Build consistency and mobility streaks',
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 42,
        points: 320,
        completedAt: new Date('2026-10-01T06:00:00Z'),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        durationMinutes: 35,
        points: 260,
        completedAt: new Date('2026-10-02T18:30:00Z'),
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 48,
        points: 370,
        completedAt: new Date('2026-10-03T17:15:00Z'),
      },
      {
        user: users[3]._id,
        type: 'mobility',
        durationMinutes: 25,
        points: 180,
        completedAt: new Date('2026-10-04T07:10:00Z'),
      },
      {
        user: users[0]._id,
        type: 'walk',
        durationMinutes: 30,
        points: 150,
        completedAt: new Date('2026-10-05T20:00:00Z'),
      },
    ]);

    const leaderboardEntries = [
      { user: users[0]._id, points: 470, rank: 1 },
      { user: users[2]._id, points: 370, rank: 2 },
      { user: users[1]._id, points: 260, rank: 3 },
      { user: users[3]._id, points: 180, rank: 4 },
    ];

    await Leaderboard.insertMany(leaderboardEntries);

    await Workout.insertMany([
      {
        name: 'Tempo Run',
        description: 'A 30-minute interval run focused on pace control.',
        durationMinutes: 30,
        difficulty: 'intermediate',
      },
      {
        name: 'Core Blast',
        description: 'Targeted core and stability circuit',
        durationMinutes: 20,
        difficulty: 'beginner',
      },
      {
        name: 'Hill Repeats',
        description: 'Short climbs to improve power and form.',
        durationMinutes: 45,
        difficulty: 'advanced',
      },
      {
        name: 'Recovery Flow',
        description: 'Gentle stretching and mobility reset.',
        durationMinutes: 15,
        difficulty: 'beginner',
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, 5 activities, ${leaderboardEntries.length} leaderboard entries, and ${4} workouts.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
