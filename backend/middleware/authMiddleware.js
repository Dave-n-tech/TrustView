const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'Unauthorized'})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({message: 'Token invalid or expired'})
    }
}

function authorizeRoles(allowedRoles) {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
      }
  
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }
  
        if (!allowedRoles.includes(decoded.role)) {
          return res.status(403).json({ message: "You do not have the required permissions" });
        }
  
        req.user = decoded; // Attach user info to request object
        next();
      });
    };
  }

module.exports = {
    verifyToken
}