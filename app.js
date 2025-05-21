const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mediaRoutes = require('./routes/mediaRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
// Serve media uploads folder (for images/videos)
app.use('/mediaUploads', express.static(path.join(__dirname, 'mediaUploads')));

// Serve UI static files (like index.html) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/media', mediaRoutes);

// Serve UI at root (index.html in public/)
app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
     .then(() => {
          console.log('Connected to MongoDB');
          app.listen(PORT, () => {
               console.log(`Server is running on http://localhost:${PORT}`);
          });
     })
     .catch(err => console.error('MongoDB connection error:', err));
