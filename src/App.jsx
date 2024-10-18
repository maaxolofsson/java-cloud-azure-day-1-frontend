import { createContext, useEffect, useState } from 'react';
import './App.css'
import AuthorList from './components/AuthorList'
import * as API from "./components/API"
import { Routes, Route } from 'react-router-dom';
import CreateAuthor from './components/CreateAuthor';

const AuthorContext = createContext()

function App() {
  const [authors, setAuthors] = useState([])

  useEffect(() => async function () {
    setAuthors((await API.get("authors")).data);
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

export {App, AuthorContext};
