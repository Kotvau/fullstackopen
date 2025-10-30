const Header = ({ course }) => {
  console.log("Kurssin nimi", course.name);
  return <h2>{course.name}</h2>;
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} /> //key={part.id} on
        // Reactin vaatimus listojen renderöinnissä / tunnistaa jokaisen rivin
      ))}
    </div>
  );
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
