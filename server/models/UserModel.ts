import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
  }
  
export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model<IUser>("Book", UserSchema);
export default User;