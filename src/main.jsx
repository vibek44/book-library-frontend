import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, ApolloProvider, InMemoryCache,createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import {
  BrowserRouter as Router
} from 'react-router-dom'


const authLink=setContext((_, { headers }) => {
  const token=localStorage.getItem('library-user-token',)
  //console.log(token)
  return{
    headers:{
      ...headers,
      authorization:token ?`Bearer ${token}`:null
    }
  }
})

const httpLink=createHttpLink({
  uri: 'http://localhost:4000'
})

const wsLink=new GraphQLWsLink(
  createClient({
    url:'ws://localhost:4000'
  })
)

const splitLink=split(
  ({ query }) => {
    const defination=getMainDefinition(query)
    return(
      defination.kind==='OperationDefinition' &&
      defination.operation==='subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link:splitLink,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
