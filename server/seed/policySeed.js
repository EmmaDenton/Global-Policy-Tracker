const mongoose = require('mongoose');
const Book = require('../models/Policy.js')

mongoose.connect('mongodb://localhost/3001', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const bookSeed = [
  {
    authors: ["Author One"],
    description: "Description for the first book",
    bookId: "1",
    image: "http://example.com/image1.jpg",
    link: "http://example.com/book1",
    title: "First Book Title"
  },
  {
    authors: ["Author Two", "Author Three"],
    description: "Description for the second book",
    bookId: "2",
    image: "http://example.com/image2.jpg",
    link: "http://example.com/book2",
    title: "Second Book Title"
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
