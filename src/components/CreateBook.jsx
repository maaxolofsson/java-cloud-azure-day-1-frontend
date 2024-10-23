import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthorContext } from "../App";
import { BookContext } from "../App";

function CreateBook() {
    // Contexts
    const authorContext = useContext(AuthorContext)
    const { authors } = authorContext

    const bookContext = useContext(BookContext)
    const { addBook } = bookContext

    // States
    const [showError, setShowError] = useState(false)
    const [selectedAuthorId, setSelectedAuthorId] = useState(
        authors.length == 0 ? -1 : authors[0].id
    )
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("")
    const [rating, setRating] = useState(1)

    // Functions
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validating inputs
        if (rating < 1) {
            setRating(1)
        } else if (rating > 10) {
            setRating(10)
        }

        if (title === "" || description === "" || genre === "") {
            setShowError(true)
            return;
        }

        const book = {
            "authorId": parseInt(selectedAuthorId),
            "title": title,
            "description": description,
            "genre": genre,
            "rating": rating
        }
        await addBook(book)
    }

    return (
        <div>
            {showError ? <h3 style={{ backgroundColor: 'red' }}>One or more fields are incorrectly or not set.</h3> : null}

            <p>Create new book for an author</p> <br />
            {authors.length > 0 ?
                <>
                    <select
                        value={selectedAuthorId}
                        onChange={(e) => setSelectedAuthorId(e.target.value)}
                    >
                        {authors.map((author) => (
                            <option value={author.id} key={author.id}>
                                {author.firstName} {author.lastName} (id: {author.id})
                            </option>
                        ))}
                    </select><br />

                    <input
                        type="text"
                        name="title"
                        placeholder="Title..."
                        onChange={e => setTitle(e.target.value)}
                    /> <br />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description..."
                        required
                        onChange={e => setDescription(e.target.value)}
                    /> <br />

                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre..."
                        required
                        onChange={e => setGenre(e.target.value)}
                    /><br />

                    Rating:
                    <input
                        type="number"
                        name="rating"
                        required
                        min="1"
                        max="10"
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                    /><br /> <br />

                    <input type="submit" name="submit" value="Create" onClick={handleSubmit} /><br />
                </>
                : <> <p>No authors in the database.</p> </>
            }
            <Link to={'/'}>Go back</Link><br /><br />
        </div>
    )
}

export default CreateBook;
