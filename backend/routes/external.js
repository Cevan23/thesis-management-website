const express = require("express");
const router = express.Router();
const ExternalController = require('../controllers/external');
const checkAuth = require('../middleware/check-auth');

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
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - lastname
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Mail exists
 *       500:
 *         description: Error
 */
router.post("/signup", ExternalController.user_signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [External]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Authentication failed
 */
router.post("/login", ExternalController.user_login);

router.all("/*",checkAuth);

module.exports = router;