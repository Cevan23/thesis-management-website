const express = require("express");
const router = express.Router();
const ExternalController = require('../controllers/external');
const checkAuth = require('../middleware/check-auth');

/**
 * @swagger
 * /external/signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [external]
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
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional bearer token for authorization
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
 * /external/login:
 *   post:
 *     summary: user login
 *     tags: [external]
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
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional bearer token for authorization
 *     responses:
 *       201:
 *         description: login successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: jwt=<token>; HttpOnly; Secure; SameSite=None
 *       401:
 *         description: Auth failed, Wrong email or password
 *       500:
 *         description: Error
 */
router.post("/login", ExternalController.user_login);


router.all("/*",checkAuth);

module.exports = router;