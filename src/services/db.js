import psql from '../utils/psql-config';
import faceRequestQueries from '../sql/face-request-queries';

const createDetectionRequest = async (fileName, fileId) => {
  try {
    const response = await psql.query(faceRequestQueries.createFaceRequest, [
      fileName,
      fileId,
    ]);
    return response;
  } catch (e) {
    console.log('Error creating request', e.message);
  }
};

const getAllRequests = async () => {
  try {
    const response = await psql.query(faceRequestQueries.getAllRequests);
    return response;
  } catch (e) {
    console.log('Error getting requests', e.message);
  }
};

const getSingleRequest = async (fileId) => {
  try {
    const response = await psql.query(faceRequestQueries.getSingleRequest, [
      fileId,
    ]);
    return response;
  } catch (e) {
    console.log('Error getting request', e.message);
  }
};

const deleteRequest = async (fileId) => {
  try {
    const response = await psql.query(faceRequestQueries.deleteRequest, [
      fileId,
    ]);
    return response;
  } catch (e) {
    console.log('Error deleting request', e.message);
  }
};

const updateStatus = async (fileId) => {
  try {
    const response = await psql.query(faceRequestQueries.updateStatus, [
      fileId,
    ]);
    return response;
  } catch (e) {
    console.log('Error updating request status', e.message);
  }
};

const updateFaceCount = async (faceCount, fileId) => {
  try {
    const response = await psql.query(faceRequestQueries.updateFaceCount, [
      faceCount,
      fileId,
    ]);
    return response;
  } catch (e) {
    console.log('Error updating face count', e.message);
  }
};

export default {
  createDetectionRequest,
  getAllRequests,
  getSingleRequest,
  deleteRequest,
  updateStatus,
  updateFaceCount,
};
