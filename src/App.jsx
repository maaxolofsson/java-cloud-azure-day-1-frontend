import { createContext, useEffect, useState } from 'react';
import './App.css'
import AuthorList from './components/AuthorList'
import { Routes, Route } from 'react-router-dom';
import * as API from './API'
import CreateAuthor from './components/CreateAuthor';

const AuthorContext = createContext()

function App() {

  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const fetching = async function () {
      const res = (await API.get("authors"))
      console.log(res)
      setAuthors(res.data);
    }

    fetching().catch(console.error);
  }, [])

  const addAuthor = async (author) => {
    console.log("Inside handleCreateAuthor")
    const res = await API.post("authors", author)
    console.log(res)
  }

  return (
    <div>
      <AuthorContext.Provider value={{ addAuthor, authors }}>
        <Routes>
          <Route path='/' element={<AuthorList authors={authors} />}></Route>
          <Route path='/createAuthor' element={<CreateAuthor />}></Route>
        </Routes>
      </AuthorContext.Provider>
    </div>
  )
}

export { App, AuthorContext };
