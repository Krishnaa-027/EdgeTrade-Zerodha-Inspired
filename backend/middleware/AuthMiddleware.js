const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("You need to login first");
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).send("Invalid or expired token");
    }
}

module.exports = { authMiddleware };