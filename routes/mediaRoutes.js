const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const mediaController = require('../controllers/mediaController');

router.post('/', upload.single('media'), mediaController.uploadMedia);

router.get('/', mediaController.getMedia);
router.put('/:id', mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
