const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header otsikko={course.name} />
      <Content osat={course.parts} />
      <Total osat={course.parts}/>
    </div>
  )
}

const Header = ({ otsikko }) => {
  return <h1>{otsikko}</h1>
}

const Content = ({ osat }) => {
  return osat.map(osa => {
    return <Part osa={osa} key={osa.id}/>
  })
}

const Part = ({ osa }) => {
  return (
    <div className={"part"}>
      <p>{osa.name}: {osa.exercises}</p>
    </div>
  )
}

const Total = ({osat}) => {
  let sumOfExercises = osat.reduce((sum, toAdd) => sum + toAdd.exercises, 0);
  return <p className={"marginLeft"}>Exercises in total: {sumOfExercises}</p>
}

export default App