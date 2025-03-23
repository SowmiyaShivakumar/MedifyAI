const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: '*', // Allow all origins (for development only)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// Serve static files from 'backend/documents'
app.use('/backend/documents', express.static(path.join(__dirname, 'backend/documents')));
// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.userId;
    const uploadPath = path.join(__dirname, 'backend', 'documents', userId);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  
  const userId = req.body.userId; // Ensure userId is sent in the form data
  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }
  
  res.json({ 
    success: true, 
    message: 'File uploaded successfully', 
    filePath: `https://medifyai.onrender.com/RecordKeeperService/backend/documents/${userId}/${req.file.filename}` 
  });
});

// Get all documents for a user
app.get('/backend/documents/:userId', (req, res) => {
  try {
      const userId = req.params.userId;
      const userDir = path.join(__dirname, 'backend', 'documents', userId);
      
      // Check if directory exists
      if (!fs.existsSync(userDir)) {
          return res.json({
              success: true,
              documents: []
          });
      }

      // Read directory contents
      const files = fs.readdirSync(userDir);
      const documents = files.map(file => ({
          name: file,
          path: path.join(userDir, file)
      }));

      res.json({
          success: true,
          documents: documents
      });
  } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({
          success: false,
          message: 'Error fetching documents'
      });
  }
});

// Serve a file for download
// app.get('/backend/documents/:userId/:filename', (req, res) => {

//     try {
//         const { userId, filename } = req.params;
//         const filePath = path.join(__dirname, 'backend', 'documents', userId, filename);
        
//         if (fs.existsSync(filePath)) {
//             res.sendFile(filePath);
//             console.log(filePath)
//         } else {
//             res.status(404).json({
//                 success: false,
//                 message: 'File not found'
//             });
//         }
//     } catch (error) {
//         console.error('Error serving file:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error serving file'
//         });
//     }
// });

// Delete a document
app.delete('/delete/:userId/:filename', (req, res) => {
  try {
      const { userId, filename } = req.params;
      const filePath = path.join(__dirname, 'RecordKeeperService', 'backend', 'documents', userId, filename);
      
      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          res.json({
              success: true,
              message: 'File deleted successfully'
          });
      } else {
          res.status(404).json({
              success: false,
              message: 'File not found'
          });
      }
  } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({
          success: false,
          message: 'Error deleting file'
      });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});