import { useState,useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
const EditAuthor=({ handleNotify,authors }) => {
  const [name, setName] = useState('choose author')
  const [born, setBorn] = useState('')
  const [changeAuthor,result]=useMutation(EDIT_AUTHOR,{
    refetchQueries:[{ query:ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()
    if(!(name&&born)){
      handleNotify('name or born is missing')
      return
    }
    changeAuthor({ variables: { name, born:Number(born) } })
    setName('')
    setBorn('')
  }
  useEffect(() => {
    if(result.data && result.data.editAuthor===null){
      handleNotify('author not found')
    }
  },[result.data])

  return (<div>
    <h2>set Birthyear</h2>
    <form onSubmit={submit}>
      <div>
        <select
          key="09sd"
          defaultValue={name}
          onChange={({ target }) => setName(target.value)}
        >
          <option >--choose author--</option>
          { authors.map(author => <option
            key={author.name}
            value={author.name}
          >
            {author.name}
          </option>)
          }
        </select>
      </div>
      <div>
        born: <input
          type='Number'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <button type='submit'>Edit author</button>
    </form>
  </div>)
}

export default EditAuthor