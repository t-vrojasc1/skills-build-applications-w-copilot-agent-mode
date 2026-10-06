import { model, models, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, min: 0, default: 0 },
    rank: { type: Number, min: 1, required: true },
  },
  { timestamps: true },
);

export default models.Leaderboard || model('Leaderboard', leaderboardSchema);
