import { useState } from 'react'
import {
  Routes, Route,
  useNavigate
} from 'react-router-dom'
import MenuLink from './components/MenuLink'
import Home from './components/Home'
import Authors from './components/Authors'
import Books from './components/Books'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBookForm from './components/AddBookForm'
import   UserInterest  from './components/UserInterest'
import { useQuery,useApolloClient } from '@apollo/client'
import { ALL_AUTHORS ,ALL_BOOKS,ME } from './queries'


const App=() => {
  const result =useQuery(ALL_AUTHORS)
  const [selectGenre,setSelectGenre]=useState(null)
  const [token,setToken]=useState(null)
  const [errorMessage ,setErrorMessage]=useState('')
  const navigate=useNavigate()
  const client=useApolloClient()
  const resultBooks=useQuery(ALL_BOOKS,{
    variables:{ selectGenre }   //variable here needs to match query def variable
  })
  console.log(resultBooks)
  const resultUser=useQuery(ME,{
    variables:{ token },
    skip:!token
  })
  const userBooks =resultUser.data ? resultBooks.data.allBooks.filter(book => book.genres.includes(resultUser.data.me.favoriteGenre)) :null
  //console.log(userBooks)
  const handleGenre= ({ target }) => {
    if ( target.value==='all'){
      setSelectGenre(null)
      return
    }
    setSelectGenre(target.value)
  }

  const notify =( message ) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    },4000)
  }

  const logout=() => {
    setToken(null)
    //localStorage.removeItem()
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }
  //console.log(result)
  if(result.loading || resultBooks.loading)
    return(<h3>...Loading</h3>)
  return (
    <div>
      <Notification message={errorMessage}/>
      <h3>check available books | authors</h3>
      <MenuLink token={token} logout={logout}/>
      <Routes>
        <Route path='/addbook' element={<AddBookForm handleNotify={notify}/>}/>
        <Route path='/usersfavorite' element={<UserInterest books={userBooks}/>}/>
        <Route path='/authors' element={<Authors authors={result.data.allAuthors } handleNotify={notify} token={token} />}/>
        <Route path='/books' element={<Books books={resultBooks.data.allBooks} handleNotify={notify} handleGenre={handleGenre}/>}/>
        <Route path='/login' element={<LoginForm  handleNotify={ notify } setToken={setToken} token={token}/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
