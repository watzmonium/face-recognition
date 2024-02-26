import fileUtil from '../utils/file-util';
import analyzeNumberOfFacesInImage from '../utils/face-detect';
import db from './db';

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
    const fileData = fileUtil.storeFileWithRandomName(request.file);
    const dbResponse = await db.createDetectionRequest(fileData.fileName, fileData.fileId)
    processDetectionRequest(fileData.fileId, fileData.fileName, callbackUrl);
    response.status(201).send(JSON.stringify({fileId: fileData.fileId}));
  } catch (e) {
    console.log('Error creating detection request', e);
    response.sendStatus(500);
  }
};

const processDetectionRequest = async (fileId, fileName, callbackUrl) => {
  try {
    // note this returns just a random number. I was unable to get a facial recognition package to work
    const detections = await analyzeNumberOfFacesInImage(fileName);
    const result = await db.updateFaceCount(detections, fileId);
    if (result.rowCount === 0) {
      return;
    }
    const request = result.rows[0];

    const jsonData = {
      requestId: request.file_id,
      faceCount: request.face_count,
      status: request.status,
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
    const allRequests = await db.getAllRequests();
    response.status(200).send(JSON.stringify(allRequests.rows));
  } catch (e) {
    console.log('Error retrieving entries from database', e);
    response.sendStatus(500);
  }
};

const getSingleDetectionRequest = async (request, response) => {
  try {
    const fileId = request.params.requestId;
    const result = await db.getSingleRequest(fileId);
    if (result.rowCount > 0) {
      const singleRes = result.rows[0]
      response.status(200).send(JSON.stringify({status: singleRes.status, fileId: singleRes.file_id, faceCount: singleRes.face_count}));
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
    const result = await db.deleteRequest(fileId);
    console.log(result)
    if (result.rowCount > 0) {
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
