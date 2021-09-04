import { Document, Model, model, Schema } from "mongoose";
import RoleEnums from '../enums/roleEnums'

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface IUser extends Document {
  email: string;
  password: string;
  avatar: string;
  role: RoleEnums;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  role: {
    type: RoleEnums,
    default: RoleEnums.user
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = model<IUser> ("User", userSchema);

export default User;
