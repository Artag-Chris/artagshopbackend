const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SEC,(err, user) =>{
        if (err) {
            res.status(401).json("token is not right");
            req.user= user
        }
        req.user = user;
        next();
    } )
    
  } else {
    res.status(401).json("not authenticated");
  }
};

const verifyTokenAndAuth = (req, res, next) =>{
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        }else{
            res.status(403).send("Access denied");
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) =>{
  verifyToken(req, res, () => {
      if (req.user.isAdmin) {
          next();
      }else{
          res.status(403).send("Access denied");
      }
  })
}

module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin};