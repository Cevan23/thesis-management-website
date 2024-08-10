const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const universityController = require('../controllers/university');

router.all("/*",checkAuth);

/**
 * @swagger
 * /university/create:
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
 *       201:
 *         description: University created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: University created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d2c7f4f1b3c5d4f9b1e1d7"
 *                     name:
 *                       type: string
 *                       example: "Harvard University"
 *       400:
 *         description: University with this name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: University with this name already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/create', universityController.create_university);

/**
 * @swagger
 * /university/get:
 *   get:
 *     summary: Retrieve a list of universities
 *     tags: [University]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: university
 *         schema:
 *           type: string
 *         description: The university to filter by
 *     responses:
 *       200:
 *         description: A list of universities
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
 *                       name:
 *                         type: string
 *                         example: "Harvard University"
 *                       pending:
 *                         type: boolean
 *                         example: false
 *                       university:
 *                         type: string
 *                         example: "Harvard"
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 pages:
 *                   type: integer
 *                   example: 2
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
router.get('/get', universityController.get_all);

module.exports = router;