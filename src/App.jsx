import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import MenuLink from './components/MenuLink'
import Home from './components/Home'
import Authors from './components/Authors'
import Books from './components/Books'
import Notification from './components/Notification'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'

const App=() => {
  const result =useQuery(ALL_AUTHORS)
  const resultBooks=useQuery(ALL_BOOKS)
  const [errorMessage ,setErrorMessage]=useState('')

  const notify =( message ) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    },4000)
  }
  //console.log(resultBooks.data)
  if(result.loading || resultBooks.loading)
    return(<h3>...Loading</h3>)
  return (
    <Router>
      <Notification message={errorMessage}/>
      <h3>check available books | authors</h3>
      <MenuLink/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/authors' element={<Authors authors={result.data.allAuthors } handleNotify={notify}/>}/>
        <Route path='/books' element={<Books books={resultBooks.data.allBooks} handleNotify={notify}/>}/>
      </Routes>
    </Router>
  )
}

export default App
