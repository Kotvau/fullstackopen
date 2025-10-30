import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newText, setFilter] = useState("");

  // HAETAAN DATA BACKENDILTÄ

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
