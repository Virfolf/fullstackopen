import { useState, useEffect } from 'react'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if (persons.find((person) => person.name === personObject.name) === undefined) { 
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })
    }
    else {
      alert(`${newName} is already added to phonebook, updating number`)
      updatePerson(persons.find((person) => person.name === newName).id)
      setNewName('')
      setNewNumber('')
    }
    
  }
  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm("Are you sure you want to remove " + person.name + "?")) {
      personService
      .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
      })
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))
      })
    } 
  }

  const updatePerson = id => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))
    })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = (filter !== '') 
    ? persons.filter(person => person.name.search(new RegExp(filter, "i")) !== -1) 
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
        <Form 
          addPerson={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
        )}
      </ul>
    </div>
  )

}

export default App
