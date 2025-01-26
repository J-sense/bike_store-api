import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const customerSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensures unique email addresses
      lowercase: true, // Converts email to lowercase
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'customer'],
      default: 'customer',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);
customerSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
customerSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', customerSchema);
// export const User = model('User', customeerSchema);
