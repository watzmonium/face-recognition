import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const storeFileWithRandomName = (file) => {
  const extension = path.extname(file.originalname);
  const randomName = crypto.randomBytes(10).toString('hex');
  const newFilename = `${randomName}${extension}`;
  const filePath = path.join(__dirname, '..', '..', 'images', newFilename);
  fs.writeFileSync(filePath, file.buffer);
  return newFilename;
};

const getImageFromDisk = (fileName) => {
  const filePath = path.join(__dirname, '..', '..', 'images', fileName);
  return fs.readFileSync(filePath);
};

export default { storeFileWithRandomName, getImageFromDisk };
