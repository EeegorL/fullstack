import Course from "./Course";

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

export default App