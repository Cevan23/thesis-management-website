const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/User");
const University = require("../models/University");
const Thesis = require("../models/Thesis");
const FileThesis = require("../models/File_Thesis");

exports.checkUniversity = (req, res, next) => {
  var thesisId = req.params.thesisId;
  var studentId = req.userData.userId;
  Thesis.findById(thesisId)
    .select("university professor")
    .exec()
    .then((doc) => {
      Student.findById(studentId)
        .select("university role")
        .exec()
        .then((user) => {
          if (
            user.university.equals(doc.university) &&
            user.role == "Student"
          ) {
            console.log("okay in checkUniversity");
            res.locals.professorId = doc.professor;
            return next();
          } else {
            return res.status(401).json({
              message: "Auth failed not student or not same university",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      console.log("error in chechUniversity: " + err);
      res.status(500).json({ error: err });
    });
};

exports.is_student = (req, res, next) => {
  if (req.userData.role != "Student") {
    console.log("You are not a student");
    res.status(400).json({ message: "You are not a student" });
  } else next();
};
