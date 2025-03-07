const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5255;

app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    
    try {
        const response = await runMedicalBot(message);
        res.json({ response });
    } catch (error) {
        console.error('Error in medical bot:', error);
        res.status(500).json({ error: 'Error generating response' });
    }
});

function runMedicalBot(message) {
    return new Promise((resolve, reject) => {
        // Launch Python process
        const pythonProcess = spawn('python', ['chatbot.py']);
        
        let botResponse = '';
        let errorOutput = '';
        
        // Send message to the Python script via stdin
        pythonProcess.stdin.write(message);
        pythonProcess.stdin.end();
        
        // Collect output from the Python script
        pythonProcess.stdout.on('data', (data) => {
            botResponse += data.toString();
        });
        
        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });
        
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(botResponse.trim());
            } else {
                reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
            }
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server running at http://192.168.65.178:${PORT}`);
});