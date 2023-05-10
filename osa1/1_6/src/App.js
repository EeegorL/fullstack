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

const Stats = (tieto) => {
  return (
    <div style={{border:'1px solid black', position:'absolute', padding:'5px', marginTop:'10px'}}>
      <h2>{tieto.otsikko}</h2>
      <ul style={{listStyleType:'none', marginLeft:'-2rem'}}>
        <li>Hyvä: {tieto.arvostelut.good}</li>
        <li>Neutraali: {tieto.arvostelut.neutral}</li>
        <li>Huono: {tieto.arvostelut.bad}</li>
      </ul>
    </div>
  )
}

export default App