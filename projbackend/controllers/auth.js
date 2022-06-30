const User = require("../models/user");
const { body, validationResult } = require("express-validator"); // For validation
const jwt = require("jsonwebtoken"); // generate token for auth
const expressJwt = require("express-jwt");

// signup controller
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

// signin controller
exports.signin = (req, res) => {
  // Get the email and password
  const { email, password } = req.body;

  // Cheecking for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      errorLocation: errors.array()[0].param,
    });
  }

  // Finding the user with the email in db (these functions can take callback with err and the postivie(user) params )
  User.findOne({ email }, (err, user) => {
    // 1st when no user exist with the email
    if (err || !user) {
      return res.staus(400).json({
        error: "Your email is not exist.",
      });
    }

    // 2nd authentication of password fail
    if (!user.auhenticate(password)) {
      // with these return statement code will not only excute farther if (these 2 checks return not authenticate user.)
      return res.status(400).json({
        error: "Your email and password not matched",
      });
    }

    // Now when user is exist in db save his/her info in tokenized format in cookie
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    // save in cookie
    res.cookie("token", token, { expire: new Date() + 999 }); // random expire day

    // show on front-end
    const { _id, name, email, role } = user;
    res.json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
    });
  });
};

// Testing

// exports.signin = (req, res) => {
//   console.log(req.body);

//   res.send("Sign in");
// };

// module.exports = { signup, signout, signin };

// Exporting like this.
