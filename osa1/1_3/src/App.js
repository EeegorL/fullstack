const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Kurssi nimi={course} />
      <Sisalto tiedot={[part1, part2, part3]}/>
      <TehtavienLukumaara tiedot={[part1, part2, part3]}/>
    </div>
  )
}

const Kurssi = (tiedot) => {
  return (
      <h1>{tiedot.nimi}</h1>
  );
}

const Sisalto = (kurssienTiedot) => {
  return kurssienTiedot.tiedot.map((kurssi)=>{
    return SisaltoOsa(kurssi.name, kurssi.exercises);
  });
}

const SisaltoOsa = (nimi,tehtavia) => {
  return <li key={nimi} style={{color:"red"}}>{nimi}: {tehtavia}</li>
}

const TehtavienLukumaara = (parts) => {
  return <p>Tehtäviä yhteensä: {parts.tiedot[0].exercises + parts.tiedot[1].exercises + parts.tiedot[2].exercises}</p>
  // return <p>Tehtäviä yhteensä: {tehtaviaYht}</p>
}


   
  



export default App