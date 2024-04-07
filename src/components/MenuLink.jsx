import { Link } from 'react-router-dom'

const MenuLink = () => {
  return(<div>
    <Link to='/' >Home</Link>
    <Link to ='/authors'> Authors </Link>
    <Link to='/books'> Books</Link>
  </div>)
}


export default MenuLink