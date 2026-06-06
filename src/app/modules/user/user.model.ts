import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import { TUser } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ['ADMIN', 'VA_COORDINATOR', 'CARE_STAFF', 'FAMILY_PORTAL'],
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'BLOCKED'],
      default: 'ACTIVE',
    },
    careHomeId: { type: Schema.Types.ObjectId, ref: 'CareHome' },
    profileImage: { type: String },
    licenseDoc: { type: String },
    academicDoc: { type: String },
    age: { type: Number },
    emergencyContact: { type: String },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  if (this.isModified('password') && this.password) {
    this.password = await bcryptjs.hash(this.password, config.bcrypt_salt_rounds);
  }
});

export const User = model<TUser>('User', userSchema);
