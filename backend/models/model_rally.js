const mongoose = require("mongoose");

const rallyScheme = new mongoose.Schema({
  rallyName: String,
  marker: { latitude: Number, longitude: Number },
  participants: [{ userId: String, latitude: Number, longitude: Number }],
});
const Rally = mongoose.model("rally", rallyScheme);

module.exports = { Rally };
