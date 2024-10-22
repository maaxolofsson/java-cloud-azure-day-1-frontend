import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthorContext } from "../App";

function CreateBook() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const author = {
            "firstName": firstName,
            "lastName": lastName
        }
        await addAuthor(author)
    }

    return (
        <div>
            <p>Create new book for an author</p>
            <Link to={'/'}>Go back</Link><br /><br />
        </div>
    )
}

export default CreateBook;
