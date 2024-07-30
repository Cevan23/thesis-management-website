const express = require("express");
const router = express.Router();

const universityController = require('../controllers/university');

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

module.exports = router;