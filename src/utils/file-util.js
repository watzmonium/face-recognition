import fs from 'fs';
import path from 'path';

const storeFileWithRandomName = (file, fileId) => {
  const extension = path.extname(file.originalname);
  const newFilename = `${fileId}${extension}`;
  const filePath = path.join(__dirname, '..', '..', 'images', newFilename);
  fs.writeFileSync(filePath, file.buffer);
  return newFilename;
};

const getImageFromDisk = (fileName) => {
  const filePath = path.join(__dirname, '..', '..', 'images', fileName);
  return fs.readFileSync(filePath);
};

export default { storeFileWithRandomName, getImageFromDisk };
