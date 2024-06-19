import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'must be logged in' });
    }
    try {
        const bearerToken = token.split(' ')[1]; // Assuming "Bearer TOKEN"
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        res.status(401).json({ error: "invalid user" })
    }


    return next();
};

export default verifyToken;
