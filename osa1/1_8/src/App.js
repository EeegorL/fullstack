import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <PageTitle otsikko={"Palautteet"}/>
      <FeedbackButtons nappitekstit={{good:"hyvä", neutral:"neutraali", bad:"huono"}} 
      handleClickEvents={
        {incrementGood: () => setGood(good + 1),
         incrementNeutral:() => setNeutral(neutral + 1),
         incrementBad:() => setBad(bad + 1)}
         }/>
      <Stats otsikko={"Palautteet yhteenvetona"} arvostelut={{good, neutral, bad}}/>
    </div>
  )
}

const PageTitle = (tieto) => {
  return <h1>{tieto.otsikko}</h1>
}

const FeedbackButtons = (tieto) => {
  return (
    <div>
          <button onClick={tieto.handleClickEvents.incrementGood}>{tieto.nappitekstit.good}</button>
          <button onClick={tieto.handleClickEvents.incrementNeutral}>{tieto.nappitekstit.neutral}</button>
          <button onClick={tieto.handleClickEvents.incrementBad}>{tieto.nappitekstit.bad}</button>
    </div>
  )
}

const Stats = ({otsikko, arvostelut}) => {
  let yhteensa = 0; 
  for(let a in arvostelut) yhteensa += arvostelut[a];

  let keskiarvo = summa(arvostelut.good, arvostelut.neutral, arvostelut.bad) / yhteensa == !NaN 
  ? summa(arvostelut.good, arvostelut.neutral, -arvostelut.bad) / yhteensa 
  : 0; // joo sais varmaan näyttää kauniimmalta mutta en jaksa :P
  
 if(yhteensa > 0) return (
    <div style={{border:'1px solid black', position:'absolute', padding:'5px', marginTop:'10px'}}>
      <h2>{otsikko}</h2>
      <ul style={{listStyleType:'none', marginLeft:'-2rem'}}>
        <li>Hyvä: {arvostelut.good}</li>
        <li>Neutraali: {arvostelut.neutral}</li>
        <li>Huono: {arvostelut.bad}</li>
          <Erotin/>
        <li>Yhteensä: {yhteensa}</li>
        <li>Keskiarvo: {keskiarvo}</li>
        <li>Positiivisia: {arvostelut.good > 0 ? (arvostelut.good / yhteensa).toFixed(2) * 100 : 0}%</li>
      </ul>
      
    </div>
  )
  return <h2>Ei palautetta</h2>
}

const Erotin = () => {
  return (
      <div>
        <hr></hr>
      </div>
    )
}

const summa = (...arvot) => {
  let summa = 0;
  for(let i of arvot) {
    summa += i;
  }
  return summa;
}

export default App