const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');

  const postSchema = new mongoose.Schema({
    telNum: String,
    content: String
  });

  const Post = mongoose.model('Post', postSchema);

  const sampleData = [
    { telNum: '123-456-7890', content: 'This is a sample post content 1' },
    { telNum: '098-765-4321', content: 'This is a sample post content 2' },
    { telNum: '555-555-5555', content: 'This is a sample post content 3' }
  ];

  Post.insertMany(sampleData)
    .then(() => {
      console.log('Sample data added');
      mongoose.connection.close();
    })
    .catch(error => {
      console.error('Error adding sample data:', error);
      mongoose.connection.close();
    });
})
.catch(error => console.error('Connection error:', error));
