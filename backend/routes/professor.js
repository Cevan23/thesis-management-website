const express = require("express");
const router = express.Router();
const ProfessorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');

router.all("/*",checkAuth,ProfessorController.isProfessor);

/**
 * @swagger
 * /professor/thesis:
 *   post:
 *     summary: Create a new thesis
 *     tags: [Thesis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - university
 *               - professor
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               prerequisites:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               university:
 *                 type: string
 *               professor:
 *                 type: string
 *               creator_student:
 *                 type: string
 *               creator_external:
 *                 type: string
 *               images:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created thesis successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 thesis:
 *                   $ref: '#/components/schemas/Thesis'
 *       400:
 *         description: You are not a professor
 *       500:
 *         description: Internal server error
 */
router.post("/thesis",ProfessorController.create_thesis) // create thesis

module.exports = router;