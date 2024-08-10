const mongoose = require("mongoose");
const Thesis = require("../models/Thesis");
const External = require("../models/External");
const User = require("../models/User");
const University = require("../models/University");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.get_users_by_role = (req, res, next) => {
  const perPage = 6; // Number of users per page
  const page = parseInt(req.query.page) || 1; // Current page, default to 1

  // Validate page number
  if (page < 1) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  let count;

  // Count total number of users with the specified role
  User.countDocuments({ role: req.params.role })
    .then((result) => {
      count = result;
      return User.find({ role: req.params.role })
        .select("_id email name lastname role university phone imageprofile")
        .skip(perPage * (page - 1))
        .limit(perPage)
        .exec();
    })
    .then((docs) => {
      if (docs.length > 0) {
        const response = {
          docs: docs,
          count: count,
          pages: Math.ceil(count / perPage),
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No entries found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.is_admin= (req,res,next) => {
  adminId=req.userData.userId
  External.findById(adminId)
  .select('role')
  .exec()
  .then(doc => {
      if(doc) {
          if(doc.role=='Admin') { 
              console.log('Auth passed: User is admin')
              return next();
          }
      }
          return res.status(401).json({
              message: 'Auth failed not ADMIN'
          })
  })
}

exports.delete_user = (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
    .select("_id email name lastname role university phone imageprofile")
    .exec()
    .then((docs) => {
      if (docs != null) res.status(200).json(docs);
      else
        res.status(404).json({
          message: "No entries found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.update_user = (req,res, next) => {
  User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
  .select("_id email name lastname role university phone imageprofile")
  .exec()
  .then((docs) => {
    if (docs != null) res.status(200).json(docs);
    else
      res.status(404).json({
        message: "No entries found",
      });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
};

exports.create_user = (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          name: req.body.name,
          lastname: req.body.lastname,
          role: req.body.role,
          university: req.body.university, 
          imageprofile: req.body.imageprofile,
        });

        user
          .save()
          .then((result) => {
            console.log("User created");
            res.status(201).json({
              message: "User created successfully",
              user: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
        }
      }
    );
  } catch (error) {
    console.error("Error in create_user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.get_externals = (req, res, next) => {
  var perPage = 6;
  var page = req.query.page || 1;
  var count;
  External.countDocuments()
    .then((result) => {
      count = result;
      External.find()
        .select("_id email name lastname role active")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()
        .then((docs) => {
          if (docs != null) {
            const response = {
              docs: docs,
              count: count,
              pages: Math.ceil(count / perPage),
            };
            res.status(200).json(response);
          } else
            res.status(404).json({
              message: "No entries found",
            });
        });
    })
    .catch((err) => {
      console.log(err + "wjat");
      res.status(500).json({
        error: err,
      });
    });
};

exports.activate_external = (req, res, next) => {
  External.findByIdAndUpdate(
    req.params.externalId,
    { active: true },
    { new: true }
  )
    .select("email name lastname role active")
    .exec()
    .then((docs) => {
      if (docs != null) res.status(200).json(docs);
      else
        res.status(404).json({
          message: "No entries found",
        });
    })
    .catch((err) => {
      console.log(err + "wjat");
      res.status(500).json({
        error: err,
      });
    });
};

exports.create_university = (req, res, next) => {
  var university = new University({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  university
    .save()
    .then((result) => {
      if (result != null) {
        console.log("University created");
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "Error in creation of university" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};


