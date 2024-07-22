const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv');
const app = express();
const port = ;

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

const postSchema = new mongoose.Schema(
  {
    telNum: String,
    content: String,
		purpose: [String],
		region: String,
		type: String,
		area: String,
  }
);

const Post = mongoose.model("Post", postSchema);

app.get("/api/posts", (req, res) => {
  Post.find()
  .then(posts =>{
    res.json(posts)})
  .catch(error=>{
    console.error('Error fetching posts:',error);
    res.status(500).send(error)
  });

});

app.post("/api/posts",(req, res) => {
  const newPost = new Post({
	  telNum: req.body.telNum,
    purpose: req.body.purpose,
    region: req.body.region,
    type: req.body.type,
    area: req.body.area,
    additionalInfo: req.body.additionalInfo,
  });
  newPost.save()
  .then(()=>res.status(201).json(newPost))
  .catch(error => res.status(500).send(error));
});

app.use(express.static(path.join(__dirname, '/build')));
app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, function () {
  console.log(`Server is running on http://localhost: ${port}`);
});

