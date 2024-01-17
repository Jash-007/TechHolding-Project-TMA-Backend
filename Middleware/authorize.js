
const jwt = require('jsonwebtoken');
const jwtkey="hahahahaha"

const verifyToken = (req, res, next) => {
    console.log("hello");
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    try {
        console.log(token.replace('Bearer ', ''));
        const decoded = jwt.verify(token.replace('Bearer ', ''), jwtkey);
        console.log(decoded);
        req.body.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};
const generateSession = (req, res, next) => {
    req.session.user = req.user;
    next();
};
module.exports={
    verifyToken,
    generateSession
}