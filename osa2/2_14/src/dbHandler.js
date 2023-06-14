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

const doDelete = person => {
  if(window.confirm(`Poistetaanko ${person.name}?`)){
    const request = axios.delete(`${baseUrl}/${person.id}`).then(a => a.data);
  }
  return;
}

export { doGetAll, doCreate, doDelete }