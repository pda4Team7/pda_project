const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  line: {
    type: [String],
  },
});

module.exports = mongoose.model("station", stationSchema);
