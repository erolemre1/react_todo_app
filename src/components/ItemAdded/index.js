import React, { useContext, useState, useEffect } from 'react'
import { Container } from 'reactstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import "./style.scss"
import { Link } from 'react-router-dom';
import TodoContext from '../context/TodoContext';
import { nanoid } from 'nanoid'

function ItemAdded() {
    const [newHeader, setNewHeader] = useState("")
    const [newLink, setNewLink] = useState("")
    const data = useContext(TodoContext)

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(...[data], data))
    })
    //burada initial state i local storageye atıyoruz


    const handleSubmit = () => {
        data.setName([...data.name, { id: nanoid(), names: newHeader, links: newLink, vote: 0 }])
        localStorage.setItem("data", JSON.stringify(...[data], data))
        // burada click anında local storageden eski verinin kopyasını alıp eklediğimizle birlikte güncelliyoruz
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
