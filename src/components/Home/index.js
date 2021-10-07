import './style.scss'
import { Col, Container, Row, Card } from 'reactstrap';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import alertify from 'alertifyjs';
import Error from "../errors/Error"
import Pagination from "../pagination"
import IteItemLink from './ItemLink';

function Home() {
    const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("data")))
    const [count, setCount] = useState(0)
    const [option, setOption] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(4)
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
        const filtered = lsData.name.filter(lsItem => item.id != lsItem.id, [lsData])
        setLsData({ name: filtered })
        localStorage.setItem("data", JSON.stringify(filtered))
        alertify.error(JSON.stringify(item.names) + " deleted.", 2)
    }
   // const indexOfLastItem = currentPage * itemPerPage;
   // const indexOfFirstItem = indexOfLastItem - itemPerPage;
  //  const currentItems = lsData.name ? lsData.name.slice(indexOfLastItem, indexOfFirstItem) : null
   // const totalPagesNum = Math.ceil(lsData.name ? lsData.name.length / itemPerPage : null)
    return (
        <Container className="width">
            <IteItemLink />
            <Col>
                {lsData ? <div className="text-center selectInput mx-auto">
                    <select value={option} multiple={false} onChange={(e) => handleOnChange(e)} className="form-select form-select-lg mb-3 " aria-label=".form-select-lg example">
                        <option >Order By</option>
                        <option value="Most">Most Voted (A-Z) </option>
                        <option value="Less">Less Voted (Z-A) </option>
                    </select>
                </div> : null}

                <div>
                    {lsData ? lsData.name.map((item) =>

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
                                    <button id={nanoid()} onClick={(e) => handleDelete(item)} value="delete" data-toggle="modal" data-target="#exampleModal" className="deleteBtn  text-white border h4 rounded-circle bg-danger p-1 mt-2">-</button>
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
                                            <h3>Do you want remove item?</h3>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" value="close" data-dismiss="modal" >Close</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" value="cancel"  >Delete item</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Modalll Ending */}
                        </Row>) : <div className="text-center text-danger h1"> <Error message="There are no items!!!" /></div>}
                </div>
              //  {lsData.name.length > 0 ? <Pagination pages={totalPagesNum} setCurrentPage={setCurrentPage} /> : null}
            </Col>
        </Container>
    )
};
export default Home;
