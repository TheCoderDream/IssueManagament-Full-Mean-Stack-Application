const jwt = require('jsonwebtoken');
const fs = require('fs');

const secretKey = fs.readFileSync('./config/key.txt');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
  }
  
  const token = authHeader.split(' ')[1];
  
  let decodedToken; 
  
  try {
      decodedToken = jwt.verify(token,secretKey );
  } catch (err) {
      err.statusCode = 500;
      throw err;
  }

  if(!decodedToken) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
  }

  req.userId = decodedToken.userId;
  next();
};