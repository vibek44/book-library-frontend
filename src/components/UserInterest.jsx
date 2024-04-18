const UserInterest=({ books }) => {
  if(!books)return null
  return (
    <table>
      <tbody>
        <tr>
          <td><b>book</b></td>
          <td><b>author</b></td>
          <td><b>published</b></td>
        </tr>
        { books.map(book => <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published }</td>
        </tr>)
        }
      </tbody>
    </table>
  )
}

export default UserInterest