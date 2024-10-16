import mongoose from "mongoose";
import bcrypt from "bcrypt";


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      lowercase: true, // Converts email to lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["manager", "customer"], // Role can only be 'manager' or 'customer'
      default: "customer", // Default role is 'customer'
     
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields



// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

UserSchema.pre("save", async function (next) {
  // the arrow function will not work here because it does not have "this" (current context) in its params
  if (this?.isModified("password") === true) {
    // isModified is a built in function that keeps track of modified fields.
    this.password = await bcrypt.hash(
      this.password,
      10
    );
  }
  next();
});
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


export default mongoose.model("User", UserSchema);
