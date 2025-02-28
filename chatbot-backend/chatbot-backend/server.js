const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

// Create an instance of OpenAI with your API key
const openai = new OpenAI({
    apiKey: 'your-openai-api-key',
});

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint for chatbot
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Make a request to GPT-3 for a response
    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: userMessage }],
            model: 'gpt-3.5-turbo', // You can use different models here
        });

        // Send the response back
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.json({ reply: "Sorry, I couldn't process your request." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Chatbot server running on http://localhost:${port}`);
});
