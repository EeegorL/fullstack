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

  export default Course;