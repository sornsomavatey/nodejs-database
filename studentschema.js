const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  sid: { type: String, required: true, unique: true },
  sname: { type: String, required: true },
  semail: { type: String, required: true, unique: true },
  spass: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
