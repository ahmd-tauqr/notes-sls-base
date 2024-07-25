const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: 'user1' }, // Payload
  'WNt3IUheuLuJSmhibJGV', // Secret key
  { expiresIn: '1h' } // Options
);

console.log(token);