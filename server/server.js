const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/auth");

//import User details || middleware
const { User } = require("./models/user");
const { auth } = require("./middleware/auth");
//bodyParser || middleware
app.use(bodyParser.json());
app.use(cookieParser());

//express request || POST new User
app.post("/api/user", (req, res) => {
  //create new User
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  //post user
  user.save((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//compare email and password
app.post("/api/user/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) res.json({ message: "User not found" });
    else
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch)
          return res.status(400).json({
            message: "wrong password"
          });
        // res.status(200).send(isMatch);
        //generate token
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("auth", user.token).send("ok");
        });
      });
  });
});
//

//location if the user finish to authenticate
app.get("/user/profile", auth, (req, res) => {
  res.status(200).send(req.token);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`started at port ${port}`);
});
