const express = require("express");
const app = express();
const port = 3000;

const isMiddleware = (req, res, next) => {
  res.send("MIDDLE");
  console.log("MIDDLEWARE");
};
app.use(isMiddleware);

app.get("/", (req, res) => {
  res.send("Hello express");
});
app.get("/signout", (req, res) => {
  res.send("You are signout.");
});
// request on abe or abcde
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});

// Middleware
const admin = (req, res) => {
  res.send("This is admin page.");
};
const isAdmin = (req, res, next) => {
  console.log("Is admin is running");
  next();
};

const isLoggedIn = (req, res, next) => {
  console.log("Is logged in running");
  next();
};

app.get("/admin", isLoggedIn, isAdmin, admin);

app.listen(port, () => {
  console.log("Your server is started.");
});
