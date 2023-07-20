const mongoose = require('mongoose');

const URI = //add a string for the db connection
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:', error);
  });

module.exports = mongoose;
