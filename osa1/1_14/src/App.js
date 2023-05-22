import { useState } from "react";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const nextAnecdote = () => {
    let next = selected == anecdotes.length - 1 ? 0 : selected + 1;
    setSelected(next);
  }

  const voteForAnecdote = () => {
    let ratingsCopy = ratings.slice();
    ratingsCopy[selected] += 1;
    setRatings(ratingsCopy);
  }

  let selectedAnecdote = anecdotes[selected];

  return (
    <div>
      <Data selected={selectedAnecdote} votes={ratings[selected]} />
      <Buttons next={nextAnecdote} vote={voteForAnecdote} />
      <Favorite anecdotes={anecdotes} ratings={ratings} />
    </div>
  )
}

const Data = ({ selected, votes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selected}</p>
      <p>Voting: {votes}</p>
    </div>
  )
}

const Buttons = ({ next, vote }) => {
  return (
    <div>
      <button onClick={() => next()}>Seuraava</button>
      <button onClick={() => vote()}>+1</button>
    </div>
  )
}

const Favorite = ({ anecdotes, ratings }) => {
  let reduceInitialValue = 0;
  if(ratings.reduce((valueToAccumulate, currentValue)=> currentValue + valueToAccumulate, reduceInitialValue) > 0) { //halusin kokeilla tällaista, for looppi ois toiminu ihan yhtä hyvin
    let favoriteJoke = anecdotes[ratings.indexOf(Math.max(...ratings))];
    return (
      <div>
        <h1>Suosikkijekku</h1>
        <p>{favoriteJoke}</p>
      </div>
    )
  }

}


export default App