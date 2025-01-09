const { MongoClient } = require("mongodb");
const Agenda = require("agenda");

const mongoConnectionString = process.env.MONGO_URI || "mongodb://localhost:27017/agenda";

const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: 'agendaJobs' },  
});

agenda.define('send email', async (job) => {
  console.log("Executing job:", job.attrs);
});

const startAgenda = async () => {
  try {
    await agenda.start();  
    console.log("Agenda started successfully!");
  } catch (error) {
    console.error("Error starting Agenda:", error);
  }
};

module.exports = { startAgenda };
