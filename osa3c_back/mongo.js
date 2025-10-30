const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.vnuuolq.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

//Muistiinpanon skeema (eli miten muistiinpano-oliot tulee tallettaa tietokantaan) ja sitä vastaava model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema); //Mongoose: kokolemien nimet monikossa - notes

// Jos vain salasana
/*
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
// Jos  nimi ja numero → lisätään uusi henkilö
else if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
*/

Person.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
