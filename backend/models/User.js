// User.js - MongoDB schema for a registered user
// Stores each user's name, email, and hashed password

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Only one account can use each email address
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // Always stored in hashed form, never as plain text
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Hash the password before saving it (plain text is never stored)
userSchema.pre("save", async function (next) {
  // Do not hash again if the password was not modified (for example, when updating the name)
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare a plain-text password with the hashed password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
