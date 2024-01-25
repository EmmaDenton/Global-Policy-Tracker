const mongoose = require('mongoose');
const User = require('../models/User.js');

mongoose.connect('mongodb://localhost/3001', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSeed = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123', 
  },
  {
    username: 'jane_doe',
    email: 'jane@example.com',
    password: 'password123',
  },
];

User.deleteMany({})
  .then(() => User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' users inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
