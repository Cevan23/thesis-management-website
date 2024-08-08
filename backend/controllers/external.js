const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const External = require("../models/External");
const User = require("../models/User");
const University = require("../models/University");

exports.user_signup = (req, res, next) => {
  External.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(405).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new External({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              lastname: req.body.lastname,
              active: false,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "External User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.user_login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Tìm kiếm trong bảng External trước
    let user = await External.findOne({ email: email }).exec();
    if (!user) {
      // Nếu không tìm thấy, tìm kiếm trong bảng User
      user = await User.findOne({ email: email }).exec();
    }

    if (!user) {
      return res.status(401).json({
        message: "Auth failed, Wrong email or password",
      });
    }

    if (user instanceof External && !user.active) {
      return res.status(401).json({
        message: "Your account must be activated by admin",
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({
          message: "Auth failed, Wrong email or password",
        });
      }

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
          role: user.role,
          name: user.name,
          lastname: user.lastname,
          university: user.university,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "5h",
        }
      );

      return res.status(200).json({
        message: "Auth successful",
        role: user.role,
        token: token,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};