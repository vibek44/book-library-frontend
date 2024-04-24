import { gql } from '@apollo/client'

const BOOK_DETAILS=gql`
  Fragment BookDetails on Book{
    id
    title
    author{
      name
    }
    published
    genres
  }
`


export const ME = gql`
query{
  me{
    id
    username
    favoriteGenre
  }
}`

export const ALL_AUTHORS = gql`
query{
  allAuthors{
    name
    born
    bookCount
  }
}`

export const ALL_BOOKS = gql`
  query allBooks($selectGenre:String){
    allBooks(genre:$selectGenre, ){
      ...BookDetails
    }
  }${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!,$published:Int!,$genres:[String!]!) {
    addBook(title: $title, author: $author, published:$published, genres:$genres) {
      ...BookDetails
    }
  }${BOOK_DETAILS}
`

export const EDIT_AUTHOR= gql`
  mutation editAuthor( $name: String!, $born:Int!) {
    editAuthor( name: $name, born:$born) {
      name
      born
      id
    }
  }
`