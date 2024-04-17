import { Link } from 'react-router-dom'

const MenuLink = ({ token,logout }) => {
  const Style={
    paddingRight:4
  }
  return(<div>
    <Link to='/' style={Style}>Home</Link>
    <Link to ='/authors' style={Style}> Authors </Link>
    <Link to='/books' style={Style}> Books</Link>
    { token
      ? <><Link to='/addbook'> addbook </Link> <button onClick={logout}>logout</button></>
      :<Link to='/login' style={Style}>login</Link>
    }
  </div>)
}


export default MenuLink