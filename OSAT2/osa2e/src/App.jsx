import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [notification, setNotification] = useState(null);

  // HAETAAN DATA BACKENDILTÄ
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log("initialPersons");
      setPersons(initialPersons);
    });
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const addName = (event) => {
    event.preventDefault();

    //Luodaan uusi henkilö olio.
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);
    //some() käy läpi persons - true, jos  henkilö on jo samalla nimellä.

    if (existingPerson) {
      if (window.confirm(`Korvaa ${newName}?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            );
            setNewNumber("");
            setNewName("");
            showNotification(`Changed ${returnedPerson.name}`);
          })
          .catch((error) => {
            showNotification(
              `Person '${existingPerson.name}' is already deleted from the server`,
              "error"
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }

      // alert(`${newName} is already added to phonebook`);
      // return; // funktion lopetus, ettei tuu tupla lisäystä

      return;
    }
    personService.create(nameObject).then((addedPerson) => {
      setPersons(persons.concat(addedPerson));
      setNewName("");
      setNewNumber("");
      showNotification(`Added ${addedPerson.name}`);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }; //Tämä tekee inputista controlled componentin: sen arvo on aina sidottu Reactin tilaan

  const handleNumberChange = (event) => {
    console.log(event.target.value); //viittaa inputin syötekentän arvoon.
    setNewNumber(event.target.value);
  }; //Tämä tekee inputista controlled componentin: sen arvo on aina sidottu Reactin tilaan

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const deletePerson = (id) => {
    const person = persons.find((n) => n.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteEntry(id)
        .then(() => {
          //ei korvata returnedPersoniolla
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${person.name}`);
        })
        .catch(() => {
          //Ei erroria sulkeissa
          showNotification(
            `The person'${person.name}' was already deleted from server`,
            "error"
          );
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filterText} handleFilterChange={handleFilterChange} />

      <h3>Add new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person
            key={person.id}
            person={person}
            toDelete={() => deletePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
