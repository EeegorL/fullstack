import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/person';

const doGetAll = async () => {
  const request = await axios.get(baseUrl).catch(err => console.log(err));
  return request.data;
}

const doCreate = async newObject => {
  await axios.post(baseUrl, newObject).catch(err => console.log(err));
  return;
}

const doDelete = async person => {
  if (window.confirm(`Poistetaanko ${person.name}?`)) {
    try {
      await axios.delete(`${baseUrl}/${person.id}`);
      return { status: true, viesti: "Poisto onnistui" };
    }
    catch (e) {
      return { status: false, viesti: "Poisto ei onnistunut: henkilöä ei ole olemassa" };
    }
  }
}

// const doUpdate = (id, newPerson) => {
//   axios.put(`${baseUrl}/${id}`, newPerson).catch(err => console.log(err));
//   return;
// }

const personExists = async id => {
  let all = await doGetAll();
  return all.some(person => person.id == id);
}

export { doGetAll, doCreate, doDelete, /*doUpdate,*/ personExists }