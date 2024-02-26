import fileUtil from '../utils/file-util';
import analyzeNumberOfFacesInImage from '../utils/face-detect';
import crypto from 'crypto';

let db = [];

const createDetectionRequest = async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).send('No image uploaded');
    }

    if (
      request.file.mimetype !== 'image/jpeg' &&
      request.file.mimetype !== 'image/png'
    ) {
      return response
        .status(415)
        .send('Unsupported image type. Supported types are jpeg and png');
    }

    if (!request.body.callbackUrl) {
      return response.status(400).send('No callback URL specified');
    }

    const callbackUrl = request.body.callbackUrl;
    const fileId = crypto.randomBytes(10).toString('hex');
    processDetectionRequest(request.file, fileId, callbackUrl);
    response.status(201).send(JSON.stringify({fileId}));
  } catch (e) {
    console.log('Error creating detection request', e);
    response.sendStatus(500);
  }
};

const processDetectionRequest = async (file, fileId, callbackUrl) => {
  try {
    const fileName = fileUtil.storeFileWithRandomName(file, fileId);
    const req = { id: 1, status: 'pending', fileId, fileName };
    db.push(req);
    const detections = await analyzeNumberOfFacesInImage(req.fileName);
    if (!req) {
      return;
    }
    req.status = 'completed';
    req.faceCount = detections;

    const jsonData = {
      requestId: req.fileId,
      faceCount: req.faceCount,
      status: req.status,
    };

    await sendCompletedDetectionRequest(callbackUrl, jsonData);
  } catch (e) {
    console.log('Error sending request update to webook', e);
  }
};

const sendCompletedDetectionRequest = async (url, jsonData) => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    });
  } catch (e) {
    console.log('Error sending data to endpoint', e);
  }
};

const getAllDetectionRequests = async (request, response) => {
  try {
    const allRequests = db.map(entry => ({status: entry.status, fileId: entry.fileId, faceCount: entry.faceCount}))
    response.status(200).send(JSON.stringify(allRequests));
  } catch (e) {
    console.log('Error retrieving entries from database', e);
    response.sendStatus(500);
  }
};

const getSingleDetectionRequest = async (request, response) => {
  try {
    const fileId = request.params.requestId;
    const req = db.find(entry => entry.fileId === fileId)
    if (req) {
      response.status(200).send(JSON.stringify({status: req.status, fileId: req.fileId, faceCount: req.faceCount}));
    } else {
      response.status(404).send(`No request with id ${fileId}`)
    }
  } catch (e) {
    console.log('Error retrieving entries from database', e);
    response.sendStatus(500);
  }
};

const deleteDetectionRequest = async (request, response) => {
  try {
    const fileId = request.params.requestId;
    const req = db.find(entry => entry.fileId === fileId)
    if (req) {
      db = db.filter(entry => entry.fileId !== fileId);
      response.sendStatus(204);
    } else {
      response.status(404).send(`No request with id ${fileId}`)
    }
  } catch (e) {
    console.log('Error retrieving entries from database', e);
    response.sendStatus(500);
  }
};

export default {
  createDetectionRequest,
  getAllDetectionRequests,
  getSingleDetectionRequest,
  deleteDetectionRequest,
};
