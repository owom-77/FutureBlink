const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
