const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth"); // Importing like this
const { body, validationResult } = require("express-validator"); // For validation

// For chaning with /api/.. we must use router not app .
router.post(
  "/signup",
  // Validation stuff as a middleware
  [
    // Name validation
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name should be minimum 3 letters"),
    // Password validation
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password should be minimum 5 letters"),
    // Email validation
    body("email").isEmail().withMessage("Provide a valid email"),
  ],
  signup
);
router.post(
  "/signin",
  // Validation stuff as a middleware
  [
    // Password validation
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password field is required"),
    // Email validation
    body("email").isEmail().withMessage("Provide your valid email"),
  ],
  signin
);

// Export the router (means all router end point)
module.exports = router;
