import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = (props) => {
  var voteAmount = 0
  if (props.votes >= 1) {
    voteAmount = props.votes
  }
  return (
    <p>
      {props.anecdote}
      <br/>
      has {voteAmount} votes.
    </p>
  )
}

const App = () => {
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
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])
  const [popular, setPopular] = useState(0)

  const SelectRandom = () => {
    const newRandom = Math.floor(Math.random() * anecdotes.length)
    setSelected(newRandom)
  }

  const Vote = () => {
    const newVotes = [...votes]
    if (newVotes[selected] === undefined) {
      newVotes[selected] = 1
    }
    else {
      newVotes[selected] = newVotes[selected] + 1
    }
    setVotes(newVotes)
    if (newVotes[selected] > popular) {
      setPopular(selected)
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}  />
      <Button handleClick={Vote} text={"Vote"}/>
      <Button handleClick={SelectRandom} text={"Next Anecdote"}/>
      <Header text="Anecdote with most votes"/>
      <Anecdote anecdote={anecdotes[popular]} votes={votes[popular]}  />
      
    </div>
  )
}

export default App
