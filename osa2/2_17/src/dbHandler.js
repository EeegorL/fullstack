import axios from 'axios';
const baseUrl = 'http://localhost:10000/persons';

const doGetAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
}

const doCreate = async newObject => {
  await axios.post(baseUrl, newObject);
  return;
}

const doDelete = async person => {
  if(window.confirm(`Poistetaanko ${person.name}?`)){
    try {
      await axios.delete(`${baseUrl}/${person.id}`);
      return {status: true, viesti: "Poisto onnistui"};
    }
    catch(e) {
      return {status: false, viesti: "Poisto ei onnistunut: henkilöä ei ole olemassa"};
    }
  
  }
}

const doUpdate = (id, newPerson) => {
    axios.put(`${baseUrl}/${id}`, newPerson);
    return;
}

export { doGetAll, doCreate, doDelete, doUpdate }