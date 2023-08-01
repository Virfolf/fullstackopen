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

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  return (
    <p>
      Good: {props.allClicks[0]}
      <br/>
      Neutral: {props.allClicks[1]}
      <br/>
      Bad: {props.allClicks[2]}
      <br/>
      All: {props.allClicks[3].length}
      <br/>
      Average: {(props.allClicks[3].reduce((sum, value) => sum = sum + value, 0)/props.allClicks[3].length)}
      <br/>
      Positive: {(props.allClicks[3].reduce((sum, value2) => (value2 === 1) ? sum = sum + value2 : sum, 0)/props.allClicks[3].length)*100} %
    </p>
  )
}

const StatisticsLine = (props) => {
  if (props.allClicksLength === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  return (
    <p>
       {props.name} {props.value}
      <br/>
    </p>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    const updatedBad = bad + 1
    setBad(updatedBad)
  }
  const ComputeAverage = () => {
    return allClicks.reduce((sum, value) => sum = sum + value, 0)/allClicks.length
  }
  const ComputePositive = () => {
    return (allClicks.reduce((sum, value2) => (value2 === 1) ? sum = sum + value2 : sum, 0)/allClicks.length)*100
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={handleGoodClick} text="Good"/>
      <Button handleClick={handleNeutralClick} text="Neutral"/>
      <Button handleClick={handleBadClick} text="Bad"/>
      <Header text="statistics"/>
      {/*<Statistics allClicks={[good, neutral, bad, allClicks]}/>*/}
      <StatisticsLine name="Good" value={good} allClicksLength={allClicks.length}/>
      <StatisticsLine name="Neutral" value={neutral} allClicksLength={allClicks.length}/>
      <StatisticsLine name="Bad" value={bad} allClicksLength={allClicks.length}/>
      <StatisticsLine name="Average" value={ComputeAverage()} allClicksLength={allClicks.length}/>
      <StatisticsLine name="Positive"  value={ComputePositive() +"%"} allClicksLength={allClicks.length}/>
    </div>
  )
}

export default App
