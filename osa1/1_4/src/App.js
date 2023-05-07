const App = () => {

  const course = 'Half Stack application development'
  const parts = [
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


  return (
    <div>
      <Kurssi nimi={course}/>
      <Sisalto tiedot={parts}/>
      <TehtavienLukumaara tiedot={parts}/>
    </div>
  )
}

const Kurssi = (kurssi) => {
  return (
      <h1>{kurssi.nimi}</h1>
  );
}

const Sisalto = (kurssien) => {
  return kurssien.tiedot.map((kurssi)=>{
    return SisaltoOsa(kurssi.name, kurssi.exercises);
  });
}

const SisaltoOsa = (nimi,tehtavia) => {
  return <li key={nimi} style={{color:"red"}}>{nimi}: {tehtavia}</li>
}

const TehtavienLukumaara = (parts) => {
  return <p>Tehtäviä yhteensä: {parts.tiedot[0].exercises + parts.tiedot[1].exercises + parts.tiedot[2].exercises}</p>
}



export default App