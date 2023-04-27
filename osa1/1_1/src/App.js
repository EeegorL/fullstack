const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  let kurssienTiedot = [
    { osa:part1, ex:exercises1 },
    { osa:part2, ex:exercises2 },
    { osa:part3, ex:exercises3 }
  ];

  return (
    <div>
      <Kurssi nimi={course} />
      <Sisalto tiedot={kurssienTiedot}/>
      <TehtavienLukumaara tiedot={kurssienTiedot}/>
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
    return <li key={kurssi.nimi} style={{color:"red"}}>{kurssi.osa}: {kurssi.ex}</li>
  });
}

const TehtavienLukumaara = (kurssienTiedot) => {
  let tehtaviaYht = 0;
  for(let k of kurssienTiedot.tiedot) tehtaviaYht += k.ex;
  return <p>Tehtäviä yhteensä: {tehtaviaYht}</p>
}
   
  



export default App