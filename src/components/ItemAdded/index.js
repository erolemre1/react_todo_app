import React, { useContext, useState, useEffect } from 'react'
import { Container } from 'reactstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import "./style.scss"
import { Link } from 'react-router-dom';
import TodoContext from '../context/TodoContext';
import { nanoid } from 'nanoid'
import alertify from 'alertifyjs';


function ItemAdded() {
    const [newHeader, setNewHeader] = useState("")
    const [newLink, setNewLink] = useState("")
    const data = useContext(TodoContext)

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(...[data], data))
    })
    //burada initial state i local storageye atıyoruz


    const handleSubmit = () => {
        console.log(newHeader)
      if (newHeader !== "" && newLink!== "") {
        data.setName([...data.name, { id: nanoid(), names: newHeader, links: newLink, vote: 0 }])
        localStorage.setItem("data", JSON.stringify(...[data], data))
        // burada click anında local storageden eski verinin kopyasını alıp eklediğimizle birlikte güncelliyoruz
        setNewHeader("")
        setNewLink("")
        alertify.success(newHeader  + " added.", 2)
      } else{
        alertify.error( "Enter link name and link url!!", 2)

      }
    }


    return (
        <Container>
            <div className="text-center mt-5 mb-3">
                <Link to="/" className="text-decoration-none h4 ">  <AiOutlineArrowLeft></AiOutlineArrowLeft> Return To List</Link>
            </div>
            <h1 className="text-center">Add New List</h1>
            <br />
            <form  className="text-center">
                <label htmlFor="text"> Link Name</label> <br />
                <input type="text" className="new-todo p-2" name="forms" placeholder="e.g. Alphabet " value={newHeader} autoFocus onChange={(e) => setNewHeader(e.target.value)} />
                <br />
                <br />
                <label htmlFor="text">Link Url</label> <br />
                <input type="text" className="new-todo p-2" name="forms" placeholder="e.g. http://abc.xyz " autoFocus value={newLink}
                    onChange={(e) => setNewLink(e.target.value)} /> <br />
                     <button className="btn btn-primary mt-4 px-3" name="forms" type="submit" onClick={() => handleSubmit()
            }
            > ADD</button>
            </form>
           

        </Container>
    )
}

export default ItemAdded
