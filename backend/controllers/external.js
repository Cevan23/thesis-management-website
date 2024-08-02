const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const External = require("../models/External");
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

exports.user_login = (req, res, next) => {
  External.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        console.log("not user");
        return res.status(401).json({
          message: "Auth failed, Wrong email or password",
        });
      }
      if (!user[0].active) {
        return res.status(401).json({
          message: "Your account must be activated from admin",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        console.log(result);
        if (err) {
          return res.status(401).json({
            message: "Auth failed, Wrong email or password",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              role: user[0].role,
              name: user[0].name,
              lastname: user[0].lastname,
              University: user[0].university,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "5h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            role: user[0].role,
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
