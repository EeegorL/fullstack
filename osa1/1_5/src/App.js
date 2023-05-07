const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Kurssi nimi={course.name}/>
      <Sisalto tiedot={course.parts}/>
      <TehtavienLukumaara tiedot={course.parts}/>
    </div>
  )
}

const Kurssi = (kurssi) => {
  return (
      <h1>{kurssi.nimi}</h1>
  );
}

const Sisalto = (kurssien) => {
  return (
  kurssien.tiedot.map(tieto => {
    return <p>{tieto.name}: {tieto.exercises}</p>
  }))

}

const SisaltoOsa = (a) => {
  return <p key={a.name} style={{color:"red"}}>{a.name}: {a.exercises}</p>
}

const TehtavienLukumaara = (parts) => {
  return <p>Tehtäviä yhteensä: {parts.tiedot[0].exercises + parts.tiedot[1].exercises + parts.tiedot[2].exercises}</p>
}



export default App