// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '50mb' })); // Allow large file uploads

// // Connect to MongoDB Atlas
// const MONGO_URI = process.env.MONGO_URI || "your_mongodb_atlas_connection_string_here";

// mongoose
//     .connect(MONGO_URI, { 
//         dbName: 'medify_documents', // Specify the database
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     })
//     .then(() => console.log('Connected to MongoDB Atlas - Medify_AI Cluster'))
//     .catch((err) => console.error('MongoDB Connection Error:', err));

// // Define Mongoose Schema (Collection: userDocuments)
// const DocumentSchema = new mongoose.Schema({
//     uid: { type: String, required: true },  // Firebase UID
//     fileName: { type: String, required: true },
//     fileType: { type: String, required: true },
//     fileData: { type: String, required: true }, // Store as base64
//     uploadedAt: { type: Date, default: Date.now },
// });

// const Document = mongoose.model('userDocuments', DocumentSchema); // Match collection name

// // Upload Route
// app.post('/upload', async (req, res) => {
//     try {
//         const { uid, fileName, fileType, fileData } = req.body;

//         // Validate input
//         if (!uid || !fileName || !fileType || !fileData) {
//             return res.status(400).json({ message: 'Missing required fields' });
//         }

//         // Save to MongoDB
//         const newDocument = new Document({ uid, fileName, fileType, fileData });
//         await newDocument.save();

//         res.status(201).json({ message: 'File uploaded successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
