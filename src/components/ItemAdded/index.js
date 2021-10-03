import React, { useContext, useState, useEffect } from 'react'
import { Container, Row } from 'reactstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import "./style.scss"
import { Link } from 'react-router-dom';
import TodoContext from '../context/TodoContext';

function ItemAdded() {
    const [newHeader, setNewHeader] = useState("")
    const [newLink, setNewLink] = useState("")
    const data = useContext(TodoContext)

    const [count, setCount] = useState(1)

    const handleSubmit = () => {
        setCount(count + 1)
        localStorage.setItem("data", JSON.stringify(data))
        data.setName([...data.name, { id: count, names: newHeader, links: newLink, vote: 0 }])

        setNewHeader("")
        setNewLink("")
    }


    return (
        <Container>
            <div className="">
                <Link to="/" className="text-decoration-none">  <AiOutlineArrowLeft></AiOutlineArrowLeft> Return To List</Link>
            </div>
            <br />
            <form >
                <input type="text" className="new-todo" name="forms" placeholder="e.g. Alphabet " value={newHeader} autoFocus onChange={(e) => setNewHeader(e.target.value)} />
                <br />
                <br />
                <input type="text" className="new-todo" name="forms" placeholder="e.g. http://abc.xyz " autoFocus value={newLink}
                    onChange={(e) => setNewLink(e.target.value)} />
            </form>
            <button className="btn btn-primary mt-4" name="forms" type="submit" onClick={() => handleSubmit()
            }
            > ADD</button>

        </Container>
    )
}

export default ItemAdded
