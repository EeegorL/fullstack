import axios from 'axios';
const baseUrl = 'http://localhost:10000/persons';

const doGetAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
}

const doCreate = async newObject => {
  const request = await axios.post(baseUrl, newObject);
  return;
}

export { doGetAll, doCreate }