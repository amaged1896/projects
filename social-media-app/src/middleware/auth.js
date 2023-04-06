import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    const token = req.header('token');
    jwt.verify(token, '@Maged', (err, decoded) => {
        if (err) return res.status(401).json(err);

        req.userId = decoded.user._id;
        next();
    });
};