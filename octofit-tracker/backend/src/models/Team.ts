import { model, models, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    teamGoal: { type: String, trim: true, default: '' },
  },
  { timestamps: true },
);

export default models.Team || model('Team', teamSchema);
