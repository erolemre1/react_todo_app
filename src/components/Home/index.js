import './style.scss'
import { Col, Container, Row, Card } from 'reactstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import alertify from 'alertifyjs';
import ReactPaginate from 'react-paginate';

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
                console.log(count)
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
            var list = lsData.name.map((data) => data)
            const arrangement = list.sort(function (a, b) { return a.vote - b.vote });
            setLsData({ name: arrangement })
        }
    }
    const handleDelete = (item) => {
        const filtered = lsData.name.filter(lsItem => item.id !== lsItem.id, [lsData])
        setLsData({ name: filtered })
        localStorage.setItem("data", JSON.stringify(filtered))
        alertify.error(JSON.stringify(item.names ? item.names : "Empty item") + " deleted.", 2)
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
                            <Row key={nanoid()} id={item.id} className="mt-3 mb-3 rowItem" >
                                <Col xs="3" key={nanoid()}>
                                    <Card className="bg-light text-center p-1 mb-2 mt-2" key={nanoid()}>
                                        <span className="h1">{item.vote}</span>
                                        <span className="h3">Points</span>
                                    </Card>
                                </Col>
                                <Col xs="9" className="selectedd"  >
                                    <div className="d-flex justify-content-between">
                                        <h2 >  {item.names}  </h2>
                                        <button id={nanoid()} value="delete" data-toggle="modal" data-target="#exampleModal" className="deleteBtn  text-white border h4 rounded-circle bg-danger p-1 mt-2">-</button>
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
                                {/* Modalll Starting */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Remove Link</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <h3>Do you want remove {item.names}?</h3>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" value="close" data-dismiss="modal" >Close</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" value="cancel" onClick={(e) => handleDelete(item)} >Delete item</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Modalll Ending */}
                            </Row>) : <div className="text-center text-danger h1">There are no items!!!</div>}
                    </div>
                </div>
            </Col>
        </Container>
    )
};

export default Home;
