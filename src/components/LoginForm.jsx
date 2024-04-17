import { useState,useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const LoginForm=({ handleNotify, setToken,token }) => {
  const [username,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()
  const [login,result]=useMutation(LOGIN,{
    onError:(error) => {
      handleNotify(error.graphQLErrors[0].message)
    }
  })
  //console.log(result)
  useEffect(() => {
    if(result.data){
      const token=result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token',token)
    }
  }, [result.data])

  const submit=(e) => {
    e.preventDefault()
    login({ variables:{ username,password } })
  }
  if(token)return(<p>Successful please continue!!</p>)

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm