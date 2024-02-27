import jwt from 'jsonwebtoken';

// middleware for accessing token and verifying it

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access;
        if (!token) {
            return res.status(400).json({ message: "token not found" });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" })
            }
            req.user = user;
            next();
        })

    } catch (error) {
        return res.status(400).json({ error })
    }
}