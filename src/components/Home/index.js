import './style.scss'
import { Col, Container, Row, Card } from 'reactstrap';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TodoContext from '../context/TodoContext';
import { nanoid } from '@reduxjs/toolkit';

function Home() {
    const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("data")))
    const [count, setCount] = useState(0)
    const data = useContext(TodoContext)

    const [option, setOption] = useState([])


    useEffect(() => () => console.log("local storage a yazılacak"), []);

    const handleClickIncrease = (item) => {
        lsData.name.map((data) => {
            if (data.id === item.id) {
                data.vote = count
            }
        })

        setCount(Number(count + 1))
        item.vote = Number(count)
        localStorage.setItem("data", JSON.stringify(lsData))

    }


    const hanleClickDecrease = (item) => {
        if (count >= 0) {
            setCount(Number(count - 1))
            item.vote = Number(count)
            localStorage.setItem("data", JSON.stringify(lsData))

        }
    }

    if (option === "Most") {
        var liste = lsData.name.map((data) => data.vote)

        const arrangement = liste.sort(function (a, b) { return b - a });
    console.log(arrangement)

    } if (option === "Less") {
        var liste = lsData.name.map((data) => data.vote)

        const arrangement = liste.sort(function (a, b) { return a - b });
    console.log(arrangement)
    }
    return (
        <Container className="width">
            <Row>
                <Col className="text-center mt-5">
                    <span className="mt-3 border text-center py-4 px-2 bg-light width  ">
                        <Link to="/added" className="px-3 h2 text-decoration-none">   <button className="btn btn-secondary "><span className="h2 ">+</span>  </button>  SUBMIT A LINK </Link>
                    </span>
                    <hr />
                </Col>
            </Row>
            <Col>
                <div>
                    <div className="text-center selectInput mx-auto">
                        <select value={option} multiple={false} onChange={(e) => setOption(e.target.value)} className="form-select form-select-lg mb-3 " aria-label=".form-select-lg example">
                            <option   >Order By</option>
                            <option value="Most" >Most Voted (A-Z) </option>
                            <option value="Less">Less Voted (Z-A) </option>
                        </select>
                    </div>
                    <div>
                        {lsData ? lsData.name.map((item) =>
                            <Row key={nanoid()} id={item.id} >
                                <Col xs="3" key={nanoid()}>
                                    <Card className="bg-light text-center p-1 mb-2" key={nanoid()}>
                                        <span className="h1">{item.vote}</span>
                                        <span className="h3">Points</span>
                                    </Card>
                                </Col>
                                <Col xs="9" >
                                    <h2>  {item.names}</h2>
                                    <a href={item.links} target="_blank" className="text-secondary ">({item.links})</a>
                                    <div className="d-flex justify-content-between mt-2">
                                        <i onClick={() => {
                                            if (item.id) {
                                                handleClickIncrease(item)
                                            }

                                        }} className="fas fa-arrow-up text-secondary"> Up Vote</i>
                                        <i onClick={() => {
                                            hanleClickDecrease(item)

                                        }} className="fas fa-arrow-down text-secondary"> Down Vote</i>

                                    </div>
                                </Col>
                            </Row>) : <div className="text-center text-danger h1">There are no items!!!</div>}
                    </div>
                </div>
            </Col>
        </Container>
    )
};

export default Home;
