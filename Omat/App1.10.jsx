import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

// presentaatiokomponentti: luo HTML-elementin <button>.
// Asettaa onClick-tapahtumakäsittelijäksi saamansa propin props.onClick.
//Näyttää napissa tekstin, joka tulee props.text-propista.
//Ei sisällä omaa tilaa eikä logiikkaa → toimii aina sen mukaan, mitä App antaa sille, uudelleenkäytettävä.

const StatisticLine = (props) => (
  <div>
    {props.text}: {props.value}
  </div>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100 + " %";

  if (all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  //useState(0) luo tilamuuttujan ja antaa alkuarvoksi 0.
  //Palauttaa kaksipaikkaisen taulukon: eka alkio = nykyinen tila, toka = funktio tilan muuttamiseen.
  //Destrukturointi [good, setGood] - good → sis nykyisen arvon,  setGood → funktio sen muuttamiseen
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>

      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
