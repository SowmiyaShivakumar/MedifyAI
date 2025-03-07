// server.js - Node.js Express server to handle requests from React Native
const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3255;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle diagnosis requests
app.post('/api/diagnose', (req, res) => {
  const { symptoms } = req.body;
  
  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms are required' });
  }

  // Spawn python process with the symptoms
  const pythonProcess = spawn('python', ['personalizedMed.py', '--api']);
  
  let dataString = '';
  let errorString = '';
  
  // Collect data from python script stdout
  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });
  
  // Collect error messages
  pythonProcess.stderr.on('data', (data) => {
    errorString += data.toString();
  });
  
  // When process ends
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ 
        error: `Python process exited with code ${code}`,
        details: errorString
      });
    }
    
    try {
      // Try to parse JSON result from Python
      const result = JSON.parse(dataString);
      return res.json(result);
    } catch (e) {
      return res.status(500).json({ 
        error: 'Failed to parse Python output',
        details: dataString
      });
    }
  });
  
  // Send symptoms to Python script via stdin
  pythonProcess.stdin.write(JSON.stringify({ symptoms }));
  pythonProcess.stdin.end();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});