import AddBookForm from './AddBookForm'
const Books=({ books,handleNotify }) => {
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td><b>book</b></td>
            <td><b>author</b></td>
            <td><b>published</b></td>
          </tr>
          {
            books.map(book => <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published }</td>
            </tr>)
          }
        </tbody>
      </table>
      <AddBookForm handleNotify={handleNotify}/>
    </div>)

}

export default Books