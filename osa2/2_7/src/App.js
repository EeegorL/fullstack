import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Harto Ellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const formSubmitEvent = (e) => {
    e.preventDefault();
    
    let personsCopy = persons.slice(); //slice triggeraa re-renderin

    if (personsCopy.find(person => person.name == newName)) alert(`${newName} on jo listalla`)
    else {
      personsCopy.push({name : newName});
      setPersons(personsCopy);
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={formSubmitEvent}>
        <div>
        Nimi: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )

}

export default App