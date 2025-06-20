// const express = require('express');
// const dotenv = require('dotenv'); //  loads environment variables from a .env file into process.env.
// const cors = require('cors');
// const OpenAI = require('openai');
// const path = require('path');

// // Load environment variables from textbook/.env 
// dotenv.config({ path: path.resolve('./textbook/.env') });

// const app = express();
// app.use(express.json());
// app.use(cors()); // Allow requests from frontend

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Helper function to get a GPT reply
// async function getChatCompletion(prompt) {
//   const chatCompletion = await openai.chat.completions.create({
//     model: 'gpt-4o',
//     messages: [{ role: 'user', content: prompt }],
//   });
//   return chatCompletion.choices[0].message.content;
// }

// // API endpoint
// app.post('/api/chat', async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const reply = await getChatCompletion(prompt);
//     res.json({ reply });
//   } catch (error) {
//     console.error('OpenAI API error:', error);
//     res.status(500).json({ error: 'Failed to fetch from OpenAI' });
//   }
// });

// // Start server
// app.listen(3000, () => {
//   console.log('Local API server listening on http://localhost:3000');
// });
