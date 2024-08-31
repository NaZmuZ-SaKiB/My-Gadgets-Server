import { model, Schema } from 'mongoose';
import { TBranch } from './branch.type';

const branchSchema = new Schema<TBranch>(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    mapLink: String,

    updatedBy: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

const Branch = model<TBranch>('Branch', branchSchema);

export default Branch;
