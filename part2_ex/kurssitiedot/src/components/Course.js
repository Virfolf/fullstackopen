const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
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

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default Course
  
