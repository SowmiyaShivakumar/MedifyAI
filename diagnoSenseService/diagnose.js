const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/diagnose', async (req, res) => {
    const { symptoms } = req.body;
    if (!symptoms) {
        return res.status(400).json({ error: 'Symptoms are required' });
    }
    
    try {
        const diagnosis = await runPythonDiagnosis(symptoms);
        res.json({ diagnosis });
    } catch (error) {
        console.error('Error in diagnosis:', error);
        res.status(500).json({ error: 'Error generating diagnosis' });
    }
});

function runPythonDiagnosis(symptoms) {
    return new Promise((resolve, reject) => {
        // Launch Python process
        const pythonProcess = spawn('python', ['diagnoSensePred.py']);
        
        let diagnosisResult = '';
        let errorOutput = '';
        
        // Send symptoms to the Python script via stdin
        pythonProcess.stdin.write(symptoms);
        pythonProcess.stdin.end();
        
        // Collect output from the Python script
        pythonProcess.stdout.on('data', (data) => {
            diagnosisResult += data.toString();
        });
        
        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });
        
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(diagnosisResult.trim());
            } else {
                reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
            }
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server running at http://192.168.65.178:${PORT}`);
});