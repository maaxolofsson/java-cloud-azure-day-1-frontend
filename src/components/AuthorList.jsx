import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthorContext } from "../App";

function AuthorList() {
    const authorContext = useContext(AuthorContext)
    const { authors } = authorContext

    return (
        <div>
            <h1>Authors</h1>
            <Link to={'/createAuthor'}>Create new author</Link><br />
            <Link to={'/createBook'}>Create new book for author</Link>
            <hr />
            <ul>
                {authors.length < 1 ? "No authors..." :
                    authors.map(author =>
                        <li key={author.id}>
                            <h2>{author.firstName} {author.lastName}</h2>
                            {author.books.length > 0 ? <p>Books written by {author.firstName}:</p> : <p>{author.firstName} has not written any books.</p>}
                            {author.books.length < 1 ? null :
                                <ul>
                                    {author.books.map(book =>
                                        <li key={book.id}>
                                            <h4>&quot;{book.title}&quot; - {book.rating}/10, {book.genre}</h4>
                                            <p><i>{book.description}</i></p>
                                        </li>
                                    )}
                                </ul>
                            }
                        </li>)
                }
            </ul>
        </div>
    )

}

export default AuthorList;

AuthorList.propTypes = {
    authors: PropTypes.array
}
