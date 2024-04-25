//the updateCache has uniqByTitle function that makes sure book is added
// only once as AddBookForm also adds book inaddition to subscription
export const updateCache=(cache,query,addedBook) => {
  const uniqByTitle=(books) => {
    let sets=new Set()
    return books.filter((book) => {
      let k = book.title
      return sets.has(k) ? false : sets.add(k)

    })
  }

  cache.updateQuery(query,({ allBooks }) => {
    return {
      allBooks:uniqByTitle(allBooks.concat(addedBook))
    }
  })
}