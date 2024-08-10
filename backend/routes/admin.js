const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/admin');
const checkAuth = require('../middleware/check-auth');


//protected routes
router.all("/*",checkAuth);
router.all("/*",checkAuth,AdminController.is_admin);

/**
 * @swagger
 * /admin/user/{role}:
 *   get:
 *     summary: Retrieve a list of users by role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *           enum: ['Professor', 'Student', 'Secretariat']
 *         required: true
 *         description: The role of the users to retrieve (e.g., Professor, Student, Secretariat)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: A list of users with the specified role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 docs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       name:
 *                         type: string
 *                         example: "John"
 *                       lastname:
 *                         type: string
 *                         example: "Doe"
 *                       role:
 *                         type: string
 *                         example: "Professor"
 *                       university:
 *                         type: string
 *                         example: "60d2c7f4f1b3c5d4f9b1e1d8"
 *                       phone:
 *                         type: string
 *                         example: "+1234567890"
 *                       imageprofile:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 pages:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Invalid page number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid page number"
 *       404:
 *         description: No users found for the specified role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No entries found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/user/:role', AdminController.get_users_by_role);

/**
 * @swagger
 * /admin/user/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *               name:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               role:
 *                 type: string
 *                 enum: [Guest, Admin, Professor, Student, Secretariat]
 *                 example: "Admin"
 *               university:
 *                 type: string
 *                 example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               imageprofile:
 *                 type: string
 *                 example: "newprofile.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                 email:
 *                   type: string
 *                   example: "newemail@example.com"
 *                 name:
 *                   type: string
 *                   example: "John"
 *                 lastname:
 *                   type: string
 *                   example: "Doe"
 *                 role:
 *                   type: string
 *                   example: "Admin"
 *                 university:
 *                   type: string
 *                   example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                 phone:
 *                   type: string
 *                   example: "0987654321"
 *                 imageprofile:
 *                   type: string
 *                   example: "newprofile.jpg"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No entries found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put('/user/:userId', AdminController.update_user);


/**
 * @swagger
 * /admin/user/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 name:
 *                   type: string
 *                   example: "John"
 *                 lastname:
 *                   type: string
 *                   example: "Doe"
 *                 role:
 *                   type: string
 *                   example: "Admin"
 *                 university:
 *                   type: string
 *                   example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *                 imageprofile:
 *                   type: string
 *                   example: "profile.jpg"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No entries found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete('/user/:userId', AdminController.delete_user);


/**
 * @swagger
 * /admin/external:
 *   get:
 *     summary: Retrieve a list of external users
 *     tags: [External]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *     responses:
 *       200:
 *         description: A list of external users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 docs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       name:
 *                         type: string
 *                         example: "John"
 *                       lastname:
 *                         type: string
 *                         example: "Doe"
 *                       role:
 *                         type: string
 *                         example: "external"
 *                       active:
 *                         type: boolean
 *                         example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 pages:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: No entries found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No entries found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/external', AdminController.get_externals);

/**
 * @swagger
 * /admin/external/activate/{externalId}:
 *   patch:
 *     summary: Activate an external user
 *     tags: [External]
 *     parameters:
 *       - in: path
 *         name: externalId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the external user to activate
 *     responses:
 *       200:
 *         description: External user activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 name:
 *                   type: string
 *                   example: "John"
 *                 lastname:
 *                   type: string
 *                   example: "Doe"
 *                 role:
 *                   type: string
 *                   example: "external"
 *                 active:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: No entries found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No entries found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.patch('/external/activate/:externalId', AdminController.activate_external);

/**
 * @swagger
 * /admin/university:
 *   post:
 *     summary: Create a new university
 *     tags: [University]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the university
 *     responses:
 *       200:
 *         description: University created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                 name:
 *                   type: string
 *                   example: "Harvard University"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in creation of university"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/university', AdminController.create_university);


/**
 * @swagger
 * /admin/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
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
 *                 description: The email of the user
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "securepassword"
 *               name:
 *                 type: string
 *                 description: The first name of the user
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 description: The last name of the user
 *                 example: "Doe"
 *               role:
 *                 type: string
 *                 description: The role of the user
 *                 enum: ['Guest', 'Admin', 'Professor', 'Student', 'Secretariat']
 *                 example: "Student"
 *               university:
 *                 type: string
 *                 description: The ID of the university
 *                 example: "60d0fe4f5311236168a109ca"
 *               imageprofile:
 *                 type: string
 *                 description: The URL of the user's profile image
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     password:
 *                       type: string
 *                       example: "securepassword"
 *                     name:
 *                       type: string
 *                       example: "John"
 *                     lastname:
 *                       type: string
 *                       example: "Doe"
 *                     role:
 *                       type: string
 *                       example: "Student"
 *                     university:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                     imageprofile:
 *                       type: string
 *                       example: "https://example.com/image.jpg"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/user', AdminController.create_user);

module.exports = router;