const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /auth/check:
 *   get:
 *     summary: Check authentication
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated successfully
 *       401:
 *         description: Unauthorized - Auth failed
 */
module.exports = (req, res, next) => {
    try { 
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};