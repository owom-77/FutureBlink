const Agenda = require("agenda");
const nodemailer = require("nodemailer");
const { MongoClient } = require("mongodb");

const mongoConnectionString = process.env.MONGO_URI || "mongodb://localhost:27017/agenda";
const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: 'agendaJobs' },  
});

agenda.define('send email', async (job) => {
  const { to, subject, body } = job.attrs.data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: process.env.EMAIL_USER,  
      pass: process.env.EMAIL_PASS,  
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
});

const scheduleEmailInAgenda = async (email) => {
  try {
    const job = agenda.create('send email', {
      to: email.to,
      subject: email.subject,
      body: email.body,
    });

    job.schedule(email.scheduledAt);  
    await job.save();

    console.log('Job scheduled:', job.attrs);
  } catch (error) {
    console.error("Error scheduling job:", error);
  }
};

const startAgenda = async () => {
  try {
    await agenda.start();  
    console.log("Agenda started successfully!");
  } catch (error) {
    console.error("Error starting Agenda:", error);
  }
};

module.exports = { startAgenda, scheduleEmailInAgenda };
