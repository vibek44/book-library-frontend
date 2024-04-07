import EditAuthor from './EditAuthor'
const Authors=({ authors,handleNotify }) => {
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td><b>author</b></td>
            <td><b>born</b></td>
            <td><b>books</b></td>
          </tr>
          {
            authors.map(author => <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount }</td>
            </tr>)
          }
        </tbody>
      </table>
      <EditAuthor handleNotify={handleNotify} authors={authors}/>
    </div>)

}

export default Authors