const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, require: true },
    urlcode: { type: String, require: true, unique: true },
    count: { type: Number, default: 0 },
})

module.exports = mongoose.model("Url", urlSchema);