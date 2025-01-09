// src/services/emailService.js
import axios from 'axios';

const scheduleEmail = async (emailData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/emails/schedule', emailData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error scheduling email:", error);
    return { error: "Failed to schedule email." };
  }
};

export { scheduleEmail };
