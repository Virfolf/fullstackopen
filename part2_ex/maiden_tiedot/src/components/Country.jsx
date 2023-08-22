const Country = ({ country }) => {
  return (
    <div>
      <h1>{country?.name?.common ? country.name.common : ''}</h1>
      <p>{country?.capital ? 'capital: ' + country.capital : Array.isArray(country) ? country.map(name => <li key={name}>{name}</li>) : country}</p>
      <p>{country?.area ? 'area: ' + country.area + ' km^2' : ''}</p>
      <h2>{country?.languages ? 'languages: ' : ''}</h2>
      <ul>
        {country?.languages ? Object.entries(country.languages).map((language) => <li key={language}>{language}</li>): ''}
      </ul>
      {country?.flags ? <img src={country.flags['svg']}/> : <p/>}
    </div>   
  )
}
  
export default Country