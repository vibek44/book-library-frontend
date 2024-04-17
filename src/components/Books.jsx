import { useState } from 'react'

const Books=({ books }) => {
  const genre=['science','philosophy','classics','drama','mystery','fantasy','medicine','all']
  const [selectGenre,setSelectGenre]=useState(null)
  let genreBooks=selectGenre?books.filter(book => book.genres.includes(selectGenre)):null
  const handleGenre= ({ target }) => {
    if(target.value==='all') {
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
          { genreBooks
            ? genreBooks.map(book => <tr key={book.title}>
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