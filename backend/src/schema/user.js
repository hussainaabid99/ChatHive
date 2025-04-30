import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    username: {
      type: String,
      required: [true, "Username is required"],
    },

    avatar: {
      type: String,
    },
  },

  { timestamps: true }
);

userSchema.pre("save", function saveUser(next) {
  const user = this;
  user.avatar = `https://robohash.org/${user.username}`;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashPassword;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
