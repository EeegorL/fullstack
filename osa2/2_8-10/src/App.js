import { useState } from 'react'

const App = () => {

  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0476942345' },
    { name: 'Harto Ellas', number: '0444875635' }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  return (
    <div>
    <h2>Puhelinluettelo</h2>
      <Lisayslomake 
      persons={persons} setPersons={setPersons}
      newName={newName} setNewName={setNewName}
      newNumber={newNumber} setNewNumber={setNewNumber}
      />
      <h2>Numerot</h2>
      <Filtteri setFilter={setFilter}/>
      <Henkilot persons={persons} filter={filter}/>
    </div>
  )
}

const Lisayslomake = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);
  
  const formSubmitEvent = (e) => {
    e.preventDefault();

    let personsCopy = persons.slice(); //slice triggeraa re-renderin

    if (personsCopy.find(person => person.name == newName)) alert(`${newName} on jo listalla`)
    else {
      personsCopy.push({ name: newName, number: newNumber });
      setPersons(personsCopy);
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

const Henkilot = ({ persons, filter }) => {
  return persons.map(person => {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
        return <p key={person.name}>{person.name}: {person.number}</p>
      }})
}

export default App