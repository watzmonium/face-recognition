import express from 'express';
import multer from 'multer';
import detectionRequests from '../services/detection-requests';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), detectionRequests.createDetectionRequest);
router.get('/', detectionRequests.getAllDetectionRequests);
router.get('/:requestId', detectionRequests.getSingleDetectionRequest);
router.delete('/:requestId', detectionRequests.deleteDetectionRequest);

export default router;
