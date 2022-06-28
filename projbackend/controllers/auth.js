const User = require("../models/user");
const { body, validationResult } = require("express-validator"); // For validation

exports.signup = (req, res) => {
  // Cheecking for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      errorLocation: errors.array()[0].param,
    });
  }
  const user = new User(req.body);
  user.encry_password = user.securePassword(user.encry_password);
  user.save((err, user) => {
    if (err) {
      res.status(400).json({
        err: "Not able to signup",
      });
    } else {
      res.json(user);
    }
  });
};

// module.exports = { signup, signout, signin };

// Exporting like this.
