const Media = require('../models/mediaModel');
const fs = require('fs');
const path = require('path');

// POST media
// mediaController.js (inside uploadMedia function)
const uploadMedia = async (req, res) => {
     try {
          if (!req.file) {
               return res.status(400).json({ message: 'No file uploaded' });
          }

          // Extract metadata from req.body (band, mediaType, dateTaken, etc)
          const { band, mediaType, dateTaken, title, description, location } = req.body;

          // Create and save the new media document with metadata + path
          const newMedia = new Media({
               band,
               mediaType,
               dateTaken,
               title,
               description,
               location,
               mediaPath: req.file.filename,
               uploadDate: new Date(),
          });

          await newMedia.save();

          // Respond with success + filename for the client UI
          return res.status(201).json({
               message: 'Upload successful',
               filename: req.file.filename,
               media: newMedia
          });
     } catch (error) {
          console.error('Upload error:', error);
          return res.status(500).json({ message: 'Server error during upload' });
     }
};


exports.getMedia = async (req, res) => {
     try {
          // Allow filtering by band and/or mediaType (photo/video)
          const { band, mediaType } = req.query;

          // Build query object dynamically
          const query = {};
          if (band) query.band = band;
          if (mediaType) query.mediaType = mediaType;

          const mediaList = await Media.find(query).sort({ uploadDate: -1 });

          res.json(mediaList);
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error', error: error.message });
     }
};


// PUT update
exports.updateMedia = async (req, res) => {
     const { id } = req.params;
     const { title, description, location } = req.body;

     try {
          const updated = await Media.findByIdAndUpdate(
               id,
               { title, description, location },
               { new: true }
          );
          res.status(200).json(updated);
     } catch (err) {
          res.status(500).json({ message: 'Update failed', error: err.message });
     }
};


exports.deleteMedia = async (req, res) => {
     try {
          const media = await Media.findById(req.params.id);
          if (!media) {
               return res.status(404).json({ message: 'Media not found' });
          }

          // Remove file from disk
          const filePath = path.join(__dirname, '..', 'mediaUploads', media.mediaPath);
          fs.unlink(filePath, (err) => {
               if (err) console.error('File deletion error:', err);
          });

          // Remove from DB
          await Media.findByIdAndDelete(req.params.id);

          res.json({ message: 'Media deleted successfully' });
     } catch (error) {
          console.error('Delete error:', error);
          res.status(500).json({ message: 'Server error', error: error.message });
     }
};

module.exports = {
     uploadMedia,
     getMedia: exports.getMedia,
     updateMedia: exports.updateMedia,
     deleteMedia: exports.deleteMedia,
};
