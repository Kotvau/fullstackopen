import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newText, setFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();

    console.log("button clicked", event.target);
    const nameExists = persons.some((person) => person.name === newName); //some() käy läpi persons - true, jos  henkilö on jo samalla nimellä.
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return; // funktion lopetus, ettei tuu tupla lisäystä
    }

    const nameObject = {
      //Luodaan uusi henkilö olio.
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName(""); //Tyhjennetään syötekenttä
    setNewNumber(""); //Tyhjennetään syötekenttä
  };
  const handleNameChange = (event) => {
    console.log(event.target.value); //viittaa inputin syötekentän arvoon.
    setNewName(event.target.value);
  }; //Tämä tekee inputista controlled componentin: sen arvo on aina sidottu Reactin tilaan

  const handleNumberChange = (event) => {
    console.log(event.target.value); //viittaa inputin syötekentän arvoon.
    setNewNumber(event.target.value);
  }; //Tämä tekee inputista controlled componentin: sen arvo on aina sidottu Reactin tilaan

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newText.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newText} handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

// Controlled inputit
export default App;
