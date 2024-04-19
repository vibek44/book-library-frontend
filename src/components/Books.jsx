import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
const Books=({ books }) => {
  const genre=['science','philosophy','classics','drama','mystery','fantasy','medicine','all']
  const [selectGenre,setSelectGenre]=useState(null)
  const genreBooks =useQuery(ALL_BOOKS,{
    variables:{ selectGenre },
    skip:!selectGenre   //variable here needs to match query def variable
  })
  const handleGenre= ({ target }) => {
    if ( target.value==='all'){
      setSelectGenre(null)
      return
    }
    setSelectGenre(target.value)
  }

  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td><b>book</b></td>
            <td><b>author</b></td>
            <td><b>published</b></td>
          </tr>
          { genreBooks.data
            ?genreBooks.data.allBooks.map(book => <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published }</td>
            </tr>)
            :books.map(book => <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published }</td>
            </tr>)
          }
        </tbody>
      </table>
      {genre.map(el => <button onClick={handleGenre} value={el} key={el}> {el} </button>)}
    </div>)

}

export default Books