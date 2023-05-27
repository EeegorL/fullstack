import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Harto Ellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const formSubmitEvent = (e) => {
    e.preventDefault();
    
    let personsCopy = persons.slice();
    personsCopy.push({name : newName});
    setPersons(personsCopy);
  }

  const handleNoteChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmitEvent}>
        <div>
        Name: <input onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )

}

export default App