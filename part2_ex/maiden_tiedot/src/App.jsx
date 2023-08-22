import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import apiService from './services/api'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    apiService
      .getAll()
        .then(initialCountries => {
          console.log("useEffectissä")
          setCountries(initialCountries.map(country => country.name.common))
      })
  }, [])

  const searchCountry = () => {
    console.log("searchCountry")
    apiService
      .getCountry(filteredCountries[0])
      .then(returnedCountry => {
        setCountry(returnedCountry)
    })
  }

  const filteredCountries = countries.filter(country => country.search(new RegExp(filter, "i")) !== -1) //  (/filter/i)


  const filterCountries = () => {
    if (filter !== '') {
      console.log(filteredCountries.length)
      if (filteredCountries.length < 10 && filteredCountries.length > 1) {
        setCountry(filteredCountries)
      }
      else if (filteredCountries.length === 1) {
        searchCountry()
      }
      else {
        setCountry("Too many candidates!")
      }
    }
    else {
      setCountry("Too many candidates!")
    }
  }  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    filterCountries()
  }

  return (
    <div>
      <h2>Countries</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <ul>
        <Country country={country} />
      </ul>
    </div>
  )
}

export default App