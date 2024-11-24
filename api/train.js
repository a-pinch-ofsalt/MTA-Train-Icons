const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/:trainName", (req, res) => {
  const trainName = req.params.trainName;

  // Read JSON file
  const jsonFilePath = path.join(__dirname, "../nycsubway.json");
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Unable to read train data" });
      return;
    }

    const trainData = JSON.parse(data);

    // Check if train icon exists
    if (trainData[trainName]) {
      res.json({ image: trainData[trainName] });
    } else {
      res.status(404).json({ error: "Train icon not found" });
    }
  });
});

module.exports = app;
