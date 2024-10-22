import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AuthorList({ authors }) {
    console.log(authors)
    console.log("Hello")
    return (
        <div>
            <h1>Authors</h1>
            <Link to={'/createAuthor'}>Create new author</Link>
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
