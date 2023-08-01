const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  const results = []
  return (  
    <div>
      {props.course.parts.forEach(value => 
        results.push(
          <p key={value.name}>
            {value.name} {value.exercises}
          </p>
        )
      )}
      {results}
    </div>

  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.course.parts.reduce((sum, value) => sum = sum + value.exercises, 0)}
    </p>
  )
}

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
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
