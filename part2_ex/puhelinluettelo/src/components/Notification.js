const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='actionbox'>
      {message}
    </div>
  )
}

export default Notification