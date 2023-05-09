const jwt = require('jsonwebtoken');

module.exports = (bearer) => {
    
  const token = bearer.split(' ')[1];
  
  try {

    const payload = jwt.verify(token, process.env.SECRET_JWT);

    if (!payload.id || !payload.username) return false;

    return payload;

  } catch (error) {
    return false
  }
}