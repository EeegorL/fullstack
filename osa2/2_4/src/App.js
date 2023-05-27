const App = () => {
  const courses = [
    {
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
    },
    {
      name: 'One Quarter Stack application development',
      id: 2,
      parts: [
        {
          name: 'Fundamentals of Slavery',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass the border illegally',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of sauerkraut',
          exercises: 140*Math.PI,
          id: 3
        }
      ]
    },
    {
      name: 'One Eighth Stack application development',
      id: 3,
      parts: [
        {
          name: 'Fundamentals of Bananas',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass the qualifications of this course',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of ᛚᛖᚱᛊᛊᛁ',
          exercises: 140*Math.PI,
          id: 3
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

const Course = ({courses}) => {
  return courses.map(course => {
    return (
      <div className={"course"} key={course.id}>
        <Header otsikko={course.name} />
        <Content osat={course.parts} />
        <Total osat={course.parts} />
      </div>
    )
  })
}

const Header = ({ otsikko }) => {
  return <h1>{otsikko}</h1>
}

const Content = ({osat}) => {
  return osat.map(osa => {
    return <Part osa={osa} key={osa.id} />
  })
}

const Part = ({ osa }) => {
  return (
    <div className={"part"}>
      <p>{osa.name}: {osa.exercises}</p>
    </div>
  )
}

const Total = ({ osat }) => {
  let sumOfExercises = osat.reduce((sum, toAdd) => sum + toAdd.exercises, 0);
  return <p className={"marginLeft"}>Exercises in total: {sumOfExercises}</p>
}

export default App