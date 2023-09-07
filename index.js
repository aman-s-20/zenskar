const express = require('express');
const app = express();
const {ListModel}= require('./list');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add this line

app.use(bodyParser.json()); // Add this line to parse JSON request bodies

function connectDB() {
  mongoose.connect('mongodb://127.0.0.1:27017/zenskar')
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => { // Handle connection errors
      console.error("DB connection error:", err);
    });
}

app.post('/sendList', async (req, res) => {
  try {
    const list = req.body;
    const newList = new ListModel(list); 
    const result = await newList.save();

    if (result) {
      res.status(201).json("Stored successfully");
    } else {
      res.status(400).json("Something went wrong");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});
app.get('/getList/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const result = await ListModel.find({ category: category });
      if (result.length > 0) { // Check if there are results
        res.status(200).json(result);
      } else {
        res.status(404).json("No items found for the specified category");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal server error");
    }
});
  

app.listen(3000, () => {
  connectDB();
  console.log("Server is started");
});
