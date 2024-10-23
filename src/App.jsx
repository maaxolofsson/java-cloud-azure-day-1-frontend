import { createContext, useEffect, useState } from 'react';
import './App.css'
import AuthorList from './components/AuthorList'
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as API from './API'
import CreateAuthor from './components/CreateAuthor';
import CreateBook from './components/CreateBook';

const AuthorContext = createContext()
const BookContext = createContext()

function App() {
  const navigate = useNavigate()

  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const fetching = async function () {
      const res = (await API.get("authors"))
      setAuthors(res.data);
    }

    fetching().catch(console.error);
  }, [])

  const addAuthor = async (author) => {
    const res = await API.post("authors", author)
    res.resData.data.books = [] // Needed because it is set to null from the API
    setAuthors([...authors, res.resData.data])
    navigate('/')
  }

  const addBook = async (book) => {
    console.log("In addBook given:")
    console.log(book)
    const res = await API.post("books", book)
    if (res.httpRes.status === 201) {
      console.log("Successfully added book to author")
      const givenAuthor = authors.find(auth => auth.id === book.authorId)
      givenAuthor.books = [...givenAuthor.books, res.resData.data]
    } else {
      console.log("Something went wrong when adding book to author.")
      console.log(res)
    }
    navigate('/')
  }

  return (
    <div>
      <BookContext.Provider value={{ addBook }}>
        <AuthorContext.Provider value={{ addAuthor, authors }}>
          <Routes>
            <Route path='/' element={<AuthorList authors={authors} />}></Route>
            <Route path='/createAuthor' element={<CreateAuthor />}></Route>
            <Route path='/createBook' element={<CreateBook />}></Route>
          </Routes>
        </AuthorContext.Provider>
      </BookContext.Provider>
    </div >
  )
}

export { App, AuthorContext, BookContext };
