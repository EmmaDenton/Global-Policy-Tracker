// Note: Seed is not set up correctly. DB will not seed.

const db = require('../config/connection');
const { Policy, User } = require('../models');
const cleanDB = require('./cleanDB');

const policySeed = require('./policySeed.json');
const userSeed = require('./userSeed.json');

db.once('open', async () => {
  await cleanDB('Policy', 'policies');
  await cleanDB('User', 'users');
  await User.create(userSeed);
  await Policy.create(policySeed);
  
  console.log('Policies seeded!');
  process.exit(0);
});
