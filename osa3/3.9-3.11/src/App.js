import { useState, useEffect } from 'react';
import { doCreate, doGetAll, doDelete, /*doUpdate,*/ personExists } from "../src/dbHandler";

const App = () => {
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [status, setStatus] = useState({});

  useEffect(() => {
    doGetAll().then(newNotes => setPersons(newNotes));
  }, []);


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Status status={status} />
      <Lisayslomake
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        setStatus={setStatus}
      />
      <h2>Numerot</h2>
      <Filtteri setFilter={setFilter} />
      <Henkilot persons={persons} filter={filter} setPersons={setPersons} setStatus={setStatus} />
    </div>
  )
}

const Lisayslomake = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setStatus }) => {
  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const formSubmitEvent = async (e) => {
    e.preventDefault();

    let personsCopy = persons.slice(); //slice triggeraa re-renderin

    if (personsCopy.find(person => person.name === newName)) {
      let existingPerson = personsCopy.find(person => person.name === newName);

      alert(`${newName} löytyy jo listalta numerolla ${existingPerson.number}`);

      /*Laita backend toimimaan edellisessä osassa tehdyn puhelinluettelon frontendin kanssa muilta osin
       paitsi mahdollisen puhelinnumeron muutoksen osalta,
       jonka vastaava toiminnallisuus toteutetaan backendiin vasta tehtävässä 3.17.*/

      // if (window.confirm(`Henkilö ${newName} löytyy jo listalta numerolla ${existingPerson.number}. Korvataanko henkilön puhelinnumero numeroksi ${newNumber}`)) {
      //   doUpdate(existingPerson.id, { name: existingPerson.name, number: newNumber });
      //   updateStatus({ teksti: "Henkilön tietoja muutettiin", tyyppi: "info" }, setStatus);
      //   setPersons(await doGetAll());
      // }
    }
    else {
      if (!newName.length === 0) {
        personsCopy.push({ name: newName, number: newNumber });
        updateStatus({ teksti: "Henkilö lisättiin", tyyppi: "info" }, setStatus);
        await doCreate({ name: newName, number: newNumber });
        setPersons(await doGetAll());
      }
    }
  }

  return <form onSubmit={formSubmitEvent}>
    <div>
      Nimi: <input onChange={handleNameChange} /><br />
      Puhelinnumero: <input onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">Lisää</button>
    </div>
  </form>
}

const Filtteri = ({ setFilter }) => {
  const filterHandler = (e) => setFilter(e.target.value);

  return <div>
    Filtteri: <input onChange={filterHandler} /><br />
  </div>
}

const Henkilot = ({ persons, filter, setPersons, setStatus }) => {
  if(persons.length === 0) persons = [{id:1, name:"abc", number:123}, {id:2, name:"def", number: 456}];
  console.log(persons);
  console.log("ererheh")
  return persons?.map(person => {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <div key={person.id}>
          <p>{person.name}: {person.number} <button onClick={() => onDelete(person, setPersons, setStatus)}>Poista</button></p>
        </div>
      )
    }
  })
}

const Status = ({ status }) => {
  return (
    <div className={`status status-${status.tyyppi}`}>
      <p>{status.teksti}</p>
    </div>
  )
}


const onDelete = async (person, setPersons, setStatus) => {
  if (await personExists(person.id)) {
    await doDelete(person);
    setPersons(await doGetAll());
    updateStatus({ teksti: "Poisto onnistui", tyyppi: "info" }, setStatus);
  } else {
    setPersons(await doGetAll());
    updateStatus({ teksti: "Henkilöä ei ole olemassa", tyyppi: "virhe" }, setStatus);
  }
}

const updateStatus = (statusObject, setStatus) => {
  setStatus(statusObject);
  setTimeout(() => setStatus({ teksti: "", tyyppi: "empty" }), 1500);
}


export default App;