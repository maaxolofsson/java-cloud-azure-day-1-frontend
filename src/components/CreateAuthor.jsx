import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthorContext } from "../App";

function CreateAuthor() {
    const [showError, setShowError] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const authorContext = useContext(AuthorContext)
    const { addAuthor } = authorContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(firstName === "" || lastName === ""){
            setShowError(true)
            return;
        }
        
        const author = {
            "firstName": firstName,
            "lastName": lastName
        }
        await addAuthor(author)
    }

    return (
        <div>
            {showError ? <h3 style={{ backgroundColor: 'red' }}>One or more fields are incorrectly or not set.</h3> : null}
            <p>Create new author</p>
            <Link to={'/'}>Go back</Link><br /><br />
            <form action="">

                <input
                    type="text"
                    name="firstName"
                    placeholder="First name..."
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                />

                <br /><br />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last name..."
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                />

                <br /><br />

                <input type="submit" name="submit" value={"Submit"} onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default CreateAuthor;
