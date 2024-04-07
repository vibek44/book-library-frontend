import { useState ,useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS,ALL_AUTHORS } from '../queries'

const AddBookForm=({ handleNotify }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre,setGenre]=useState('')
  const [genres,setGenres]=useState([])
  const [ addBook,result ] = useMutation(ADD_BOOK,{
    refetchQueries:[{ query:ALL_BOOKS },{ query:ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()
    if(!(title&&author&&published)){
      handleNotify('title or author is missing')
      return
    }
    addBook({ variables: { title, author,published:Number(published),genres } })
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  return (
    <div>
      <h2>add book</h2>

      <form onSubmit={submit}>
        <div>
          title: <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published: <input
            type='Number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button type='button' onClick={() => {
            setGenres(genres.concat(genre))
            setGenre('')
          }} >add genre</button>
          { genres.length>0 && <p>genre: {genres.join(',')}`</p> }
        </div>
        <button type='submit'>add-book</button>
      </form>
    </div>
  )
}




export default AddBookForm