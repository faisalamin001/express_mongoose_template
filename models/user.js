const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    allowNull: true,
  },
  avatar: {
    type: String,
    allowNull: true,
  },
  last_name: {
    type: String,
    allowNull: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  auth_source: {
    type: String,
    enum: ["Normal", "Google", "Facebook"],
    default: "Normal",
  },
  is_super_admin: {
    type: Boolean,
    default: false,
  },
  archive: {
    type: Boolean,
    default: false,
  },
  last_active: {
    type: String,
    allowNull: true,
  },
  terms_accepted: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

// Hash the password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
