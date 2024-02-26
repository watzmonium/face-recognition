import config from './config';

const valdiateApiKey = (key) => {
  if (!key) {
    return false;
  }
  key = key.split(' ')[1];
  return config.API_KEYS.includes(key);
};

export default valdiateApiKey;
