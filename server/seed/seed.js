// Note: Seed is not set up correctly. DB will not seed.

const db = require('../config/connection');
const { Tech } = require('../models');
const cleanDB = require('./cleanDB');

const policyData = require('./policySeed.json');

db.once('open', async () => {
  await cleanDB('Tech', 'teches');

  await Policy.insertMany(policySeed);

  console.log('Policies seeded!');
  process.exit(0);
});
