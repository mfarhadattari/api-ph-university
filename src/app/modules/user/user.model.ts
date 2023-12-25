import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { config } from '../../config';
import { UserStatus } from './user.const';
import { IUser, IUserModel } from './user.interface';

const userSchema = new Schema<IUser, IUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      required: true,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

// save hashing password in database
userSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const newUser = this;
  bcrypt.hash(
    newUser.password,
    Number(config.bcrypt_salt_rounds),
    (err, hashedPassword) => {
      if (err) throw err;
      newUser.password = hashedPassword;
      next();
    },
  );
});

// is user exist static
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

// matched password
userSchema.statics.isPasswordMatched = async function (
  planPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compare(planPassword, hashedPassword);
};

// checking password update time > token issued time
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  changePasswordTimestamps: Date,
  tokenIssueTime: number,
) {
  const changePasswordTime =
    new Date(changePasswordTimestamps).getTime() / 1000;

  return changePasswordTime > tokenIssueTime;
};

export const User = model<IUser, IUserModel>('User', userSchema);
