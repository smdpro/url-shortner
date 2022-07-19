const jwt=require('jsonwebtoken');


module.exports = function (req, res, next) {
  if (!req.header('x-auth-token')) return res.status(401).send('unauthorized');
  const token = req.header('x-auth-token') ;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).send('unauthorized');
  }
};
