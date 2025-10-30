import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

// presentaatiokomponentti: luo HTML-elementin <button>.
// Asettaa onClick-tapahtumakäsittelijäksi saamansa propin props.onClick.
//Näyttää napissa tekstin, joka tulee props.text-propista.
//Ei sisällä omaa tilaa eikä logiikkaa → toimii aina sen mukaan, mitä App antaa sille, uudelleenkäytettävä.

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}:</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100 + " %";

  if (all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  //useState(0) luo tilamuuttujan React komponenttiin ja antaa alkuarvoksi 0.
  //Palauttaa kaksipaikkaisen taulukon: eka alkio = nykyinen tila, toka = funktio tilan muuttamiseen.
  //Destrukturointi [good, setGood] - good → sis nykyisen arvon,  setGood → funktio sen muuttamiseen
  //Ero tavalliseen muuttujaan on, että et koskaan muuta good-arvoa suoraan
  // //vaan aina kutsut setGood(...), jotta React tietää, että komponentti pitää piirtää uudelleen.(aina piirrettävä uudelleen)
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    //Tämä on tapahtumakäsittelijäfunktio.
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const showRandom = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex); //setSelected(randomIndex) päivittää tilan selected uudeksi arvoksi.
  };

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0); //eka anecdotes[0]

  const [votes, setVotes] = useState(new Array(8).fill(0));
  console.log("Votts", votes);

  // lasketaan eniten ääniä saanut heti renderöitäessä
  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes);

  const handleVote = () => {
    const copy = [...votes]; // tehdään kopio nykyisestä taulukosta
    copy[selected] += 1; // kasvatetaan valitun kohdan arvoa
    setVotes(copy); // päivitetään tila uudella taulukolla
    // //Raeact ei muuta heti votes-muuttujaa synkronisesti, vasta seuraavalla renderöintikierroksella
    console.log("Voootes", copy);
  };

  return (
    <div>
      <h1>Give feedback</h1>

      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <br />
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={showRandom} text="next anekdote" />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

export default App;
