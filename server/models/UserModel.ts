import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  score: number;
  kills: number;
  deaths: number;
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: String, required: false, default: 0 },
  kills: { type: String, required: false, default: 0 },
  deaths: { type: String, required: false, default: 0 },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
