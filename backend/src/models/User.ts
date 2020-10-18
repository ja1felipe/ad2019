import { Schema, model, Document } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
  name: string;
  email: string;
  friend?: IUser;
  generateToken: Function;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => {
          return validator.isEmail(email);
        },
        message: 'Invalid e-mail address.'
      },
      unique: true
    },
    friend: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const User = model<IUser>('Users', UserSchema);

export default User;
