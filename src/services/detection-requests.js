import fileUtil from '../utils/file-util';
import analyzeNumberOfFacesInImage from '../utils/face-detection/face-detect';

const db = {};

const createDetectionRequest = async (request, response) => {
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
  processDetectionRequest(request.file, callbackUrl);
  response.sendStatus(201);
};

const processDetectionRequest = async (file, callbackUrl) => {
  // save file
  // write to database (status: pending)
  // await analyzing image
  // check if the request has since been deleted! if so, return
  // update the database
  // send a fetch request to the callbackUrl
  const imageName = fileUtil.storeFileWithRandomName(file);
  db[imageName] = { id: 1, status: 'pending', fileId: imageName };
  const detections = await analyzeNumberOfFacesInImage(imageName);
  db[imageName].status = 'completed';
  db[imageName].faceCount = detections.length;

  const jsonData = {
    requestId: db[imageName].fileId,
    faceCount: db[imageName].faceCount,
    status: db[imageName].status,
  };

  await sendCompletedDetectionRequest(callbackUrl, jsonData); 
  console.log(db)
};

const sendCompletedDetectionRequest = async (url, jsonData) => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    });
  } catch (e) {
    console.log('error sending data to webhook', e);
  }
};

const getAllDetectionRequests = async (request, response) => {
  // query database and return all entries
  // should be an array of entries, each with {id, status, numfaces}
};

const getSingleDetectionRequest = async (request, response) => {
  // query database and return 1 entry
  // should be single object with {id, status, numfaces}
};

const deleteDetectionRequest = async (request, response) => {
  // attempt to delete from database
  // return 200
};

export default {
  createDetectionRequest,
  getAllDetectionRequests,
  getSingleDetectionRequest,
  deleteDetectionRequest,
};
