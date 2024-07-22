const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const External = require("../models/external");

/**
 * @swagger
 * tags:
 *   name: External
 *   description: External user management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *         - lastname
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         active:
 *           type: boolean
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [External]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Mail exists
 *       500:
 *         description: Error
 */
exports.user_signup = (req, res, next) => {
    External.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new External({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                name: req.body.name,
                lastname: req.body.lastname,
                active : false
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "External User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
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
      .then(user => { 
        if (user.length < 1) {console.log("not user")
          return res.status(401).json({
            message: "Auth failed, Wrong email or password"
          });
        }
        if(!user[0].active) {
          return res.status(401).json({
            message: "Your account must be activated from admin"
          }) 
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => { console.log(result)
          if (err) {
            return res.status(401).json({
              message: "Auth failed, Wrong email or password"
            });
          }
          if (result) { 
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
                role: user[0].role,
                name: user[0].name,
                lastname: user[0].lastname
              },
              process.env.JWT_KEY,
              {
                expiresIn: "5h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              role: user[0].role
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  