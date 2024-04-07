
const Notification=({ message }) => {
  const Style={ color:'red' }
  if(!message)return null
  return(<p style={Style}>{message}</p>)
}

export default Notification