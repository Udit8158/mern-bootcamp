const mongoose = require("mongoose");
// const { createHmac } = import("node:crypto");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  encry_password: {
    type: String,
    required: true,
    maxlength: 120,
    minlength: 6,
  },
});

// userSchema
//   .virtual("nameEmail")
//   .get(function () {
//     return this.name + this.email;
//   })
//   .set(function (nameEmail) {
//     this.name = nameEmail.substr(0, nameEmail.indexOf("@"));
//     this.email = nameEmail.substr(nameEmail.indexOf("@") + 1);
//   });

// userSchema.virtual("password").get(function () {
//   return this.encry_password;
// });

// Defining methods.
userSchema.methods = {
  hello: function () {
    console.log(`Hello ${this.name}`);
  },

  // make our plain password into a hash secure password
  setSecurePassword: function (plainPassword) {
    const hash = crypto
      .createHmac("sha256", uuidv4())
      .update(plainPassword)
      .digest("hex");
    return hash;

    // return (this.encry_password = plainPassword + uuidv4());
  },
};
module.exports = mongoose.model("User", userSchema);
