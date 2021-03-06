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
    if (err) {
      return res.status(400).json({
        error: "OOPS, there is an error.",
      });
    }
    if (!user) {
      return res.status(200).json({
        error: "Your email is not exist. Please signup with this emali first.",
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

// Sign out route
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout successfully",
  });
};

// protected test route middleware
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET_KEY,
  userProperty: "auth", // this auth give user an object containing user id.
});

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id === req.auth._id;

  if (!checker) {
    return res.status(403).json({
      error: "Acess Denied.",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Acess Denied by Admin.",
    });
  }

  next();
};
