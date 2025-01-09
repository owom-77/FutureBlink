const Email = require("../model/Email");
const { scheduleEmailInAgenda } = require("../services/emailService");

const scheduleEmail = async (req, res) => {
  const { to, subject, body, scheduledAt } = req.body;

  try {
    const email = new Email({ to, subject, body, scheduledAt });
    await email.save();

    await scheduleEmailInAgenda(email);
    
    res.status(200).json({ message: "Email scheduled successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule email." });
  }
};

module.exports = { scheduleEmail };
