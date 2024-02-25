const createDetectionRequest = async (request, response) => {
  if (!request.file) {
    return response.status(400).send('No image uploaded');
  }

  if (request.file.mimetype !== 'image/jpeg' || request.file.mimetype !== 'image/png') {
    return response
      .status(415)
      .send('Unsupported image type. Supported types are jpeg and png');
  }

  if (!request.body.callbackUrl) {
    return response.status(400).send('No callback URL specified');
  }

  const callbackUrl = request.body.callbackUrl;

  processDetectionRequest(request.file, callbackUrl);
  response.status(201);
};

const getAllDetectionRequests = async (request, response) => {};

const getSingleDetectionRequest = async (request, response) => {};

const deleteDetectionRequest = async (request, response) => {};

export default {
  createDetectionRequest,
  getAllDetectionRequests,
  getSingleDetectionRequest,
  deleteDetectionRequest,
};
