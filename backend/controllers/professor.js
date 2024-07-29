const mongoose = require("mongoose");
const Professor = require("../models/User");
const University = require("../models/University");
const Thesis = require("../models/Thesis");
const Thesis_File = require("../models/Thesis_File");

exports.isProfessor = (req, res, next) => {
  if (
    req.userData.role != "Professor" &&
    req.userData.role != "External-Professor"
  ) {
    console.log("You are not a professor, you are a: " + req.userData.role);
    res.status(400).json({ message: "You are not a professor" });
  } else next();
};

exports.create_thesis = (req, res, next) => {
  const thesisData = {
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    prerequisites: req.body.prerequisites,
    tags: req.body.tags,
    created_time: new Date(),
    file: [],
    assigned: false,
    university: req.body.university,
    professor: req.body.professor,
    pending: true,
    creator_student: req.body.creator_student || null,
    creator_external: req.body.creator_external || null,
    images: req.body.images,
  };

  const thesis = new Thesis(thesisData);

  thesis
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created thesis successfully",
        thesis: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
