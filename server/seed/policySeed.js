const mongoose = require('mongoose');
const Book = require('../models/Policy.js')

mongoose.connect('mongodb://localhost/3001', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const policySeed = [
  {
    legislation: ["AI Governance Framework"],
    countryCode: "AUD",
    topic: "AI",
    policyId: "1",
    status: "Implemented",
    description: "Personal Data Protection Commission (PDPC) & IDMA published AIGF in 2020",
    lastUpdated: "Thurs, 25 Jan 2024",
    dateCreated: "Wed, 24 Jan 2024"
  },
  {
    legislation: ["Blueprint for an AI Bill of Rights"],
    countryCode: "Blueprint for an AI Bill of Rights",
    topic: "1",
    policyId: "http://example.com/image1.jpg",
    status: "http://example.com/book1",
    description: "First Book Title",
    lastUpdated: "First Book Title",
    dateCreated: "First Book Title"
  },
];

Book.insertMany(bookSeed)
  .then(() => {
    console.log('Data inserted');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting data', err); 
    mongoose.connection.close();
  });
