const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto"); // crypto is used for generating hash pass.
const { v4: uuidv4 } = require("uuid");

// Making a schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },

    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// TODO:  Not working like hitesh sir for me so I add one line in auth controller file and manually set the encry_password.
// vitual field
// userSchema
//   .virtual("password")
//   .set(function (password) {
//     // this._password = password; //TODO: not understand _password
//     this.salt = uuidv4();
//     this.encry_password = this.securePassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

// Defining some method
userSchema.methods = {
  // For authentication
  auhenticate: function (plainPassword) {
    return this.securePassoword(plainPassword) === this.encry_password;
  },
  // It generate hash password from user's plain password
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      const hash = crypto
        .createHmac("sha256", uuidv4())
        .update(plainPassword)
        .digest("hex");
      return hash;
    } catch (error) {
      return "";
    }
  },
};

// Exporting the schema
module.exports = mongoose.model("User", userSchema);
