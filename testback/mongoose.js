const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/mytestdb";
const User = require("./models/user");

// connection with db
mongoose.connect(URI, () => {
  console.log("DB is connected");
});

// asyc function to create collections and object
const saveInDb = async () => {
  try {
    const user = new User({
      name: "Udit kundu",
      email: "udd@gmail.com",
      encry_password: "udit2022",
    });
    // make user password encrypted
    user.encry_password = user.setSecurePassword(user.encry_password);
    // user.nameEmail = "Uditudit@gmail.com";

    await user.save();
    console.log(user);

    // save in db
  } catch (error) {
    console.log("ERROR: ", error.message);
  }
};
saveInDb();
