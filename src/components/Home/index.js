import './style.scss'
import { Col, Container, Row, Card } from 'reactstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

function Home() {

    const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("data")))
    const [count, setCount] = useState(0)
    const [option, setOption] = useState([])
    const lsAdded = () => {
        localStorage.setItem("data", JSON.stringify(lsData))
    }


    const handleClickIncrease = (item) => {
        lsData.name.map((data) => {

            if (data.id === item.id) {
                item.vote = item.vote + 1
                setCount(item.vote)
            }
        })
        lsAdded()

    }

    const hanleClickDecrease = (item) => {
        lsData.name.map((data) => {

            if (data.id === item.id) {
                item.vote = item.vote - 1
                setCount(item.vote)
            }
        })

        lsAdded()


    }


    function handleOnChange(e) {
        setOption(e.target.value)
        if (e.target.value === "Most") {
            var liste = lsData.name.map((data) => data)
            const arrangement = liste.sort(function (a, b) { return b.vote - a.vote });
            setLsData({ name: arrangement })
        } if (e.target.value === "Less") {
            var liste = lsData.name.map((data) => data)
            const arrangement = liste.sort(function (a, b) { return a.vote - b.vote });
            setLsData({ name: arrangement })

        }
    }
    const handleDelete = (item) => {

        const filtered = lsData.name.filter(lsItem => item.id !== lsItem.id, [lsData])
        setLsData({ name: filtered })
        localStorage.setItem("data", JSON.stringify(filtered))

    }
    const handleMouseEnter = (item, e) => {
        const target = e.currentTarget
        console.log(target)
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
                        <select value={option} multiple={false} onChange={(e) => handleOnChange(e)} className="form-select form-select-lg mb-3 " aria-label=".form-select-lg example">
                            <option >Order By</option>
                            <option value="Most">Most Voted (A-Z) </option>
                            <option value="Less">Less Voted (Z-A) </option>
                        </select>
                    </div>
                    <div>
                        {lsData.name ? lsData.name.map((item) =>
                            <Row key={nanoid()} id={item.id} className="mt-3 mb-3" >
                                <Col xs="3" key={nanoid()}>
                                    <Card className="bg-light text-center p-1 mb-2" key={nanoid()}>
                                        <span className="h1">{item.vote}</span>
                                        <span className="h3">Points</span>
                                    </Card>
                                </Col>
                                <Col xs="9" className="selectedd" onMouseEnter={(e) => handleMouseEnter(item, e)} >
                                    <div className="d-flex justify-content-between">
                                        <h2 >  {item.names}  </h2>
                                        <span id={item.id} value="delete" onClick={(e) => handleDelete(item)} className="deleteBtn text-white border h3 rounded-circle  bg-danger p-1">-</span>
                                    </div>
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
