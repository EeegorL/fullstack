
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
    </div> // oli jo muutenkin Stats-komponenttina :P
  )
}

const PageTitle = (tieto) => {
  return <h1>{tieto.otsikko}</h1>
}

const FeedbackButtons = (tieto) => {
  return (
    <div>
          <Button text={tieto.nappitekstit.good} action={tieto.handleClickEvents.incrementGood}/>
          <Button text={tieto.nappitekstit.neutral} action={tieto.handleClickEvents.incrementNeutral}/>
          <Button text={tieto.nappitekstit.bad} action={tieto.handleClickEvents.incrementBad}/>
    </div>
  )
}

const Stats = ({otsikko, arvostelut}) => {
  let yhteensa = 0; 
  for(let a in arvostelut) yhteensa += arvostelut[a];

  let keskiarvo = summa(arvostelut.good, -arvostelut.bad) / yhteensa;

  if(yhteensa > 0) return (
    <div style={{border:'1px solid black', position:'absolute', padding:'5px', marginTop:'10px'}}>
      <h2>{otsikko}</h2>
      <ul style={{listStyleType:'none', marginLeft:'-2rem'}}>
        <StatisticLine text={"Hyvä"} value={arvostelut.good}/>
        <StatisticLine text={"Neutraali"} value={arvostelut.neutral}/>
        <StatisticLine text={"Huono"} value={arvostelut.bad}/>
          <Erotin/>
        <StatisticLine text={"Yhteensä"} value={yhteensa}/>
        <StatisticLine text={"Keskiarvo"} value={keskiarvo}/>
        <StatisticLine text={"Positiivisia"} value={(arvostelut.good / yhteensa).toFixed(2) * 100 + "%"}/>
      </ul>
    </div>
  )
  return <h2>Ei palautetta</h2>
}

const Button = ({text, action}) => {
  return <button style={{color:'red'}} onClick={action}>{text}</button>
}

const StatisticLine = ({text, value}) => {
  return <li>{text}: {value}</li>
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