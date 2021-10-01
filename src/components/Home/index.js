import './style.scss'
import { Col, Container, Row, Card } from 'reactstrap';
import { useContext, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import TodoContext from '../context/TodoContext';

function Home() {
    const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("data")))
    const data = useContext(TodoContext)
    console.log("data", data)
    console.log("lsData", lsData)
 const [count, setCount] = useState("")
 
    const handleClickIncrease = (index,item) => {
        console.log(index)
   item.vote =  
   
  setCount( Number(count +1))

  
    }
    const hanleClickDecrease = (index) => {
        console.log(index)

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
                        <select className="form-select form-select-lg mb-3 " aria-label=".form-select-lg example">
                            <option >Order By</option>
                            <option>Most Voted (A-Z) </option>
                            <option>Less Voted (Z-A) </option>
                        </select>
                    </div>
                    <div>
                        {lsData ? lsData.name.map((item, index) =>
                            <Row key={index} id={item.id} >
                                <Col xs="3" key={index}>
                                    <Card className="bg-light text-center p-1 mb-2" key={index}>
                                        <span className="h1">{item.vote}</span>
                                        <span className="h3">Points</span>
                                    </Card>
                                </Col>
                                <Col xs="9" >
                                    <h2>  {item.names}</h2>
                                    <a href={item.links} target="_blank" className="text-secondary ">({item.links})</a>
                                    <div className="d-flex justify-content-between mt-2">
                                        <i onClick={() => {
                                            if (index === item.id) {
                                                handleClickIncrease(index,item)
                                            }

                                        }} className="fas fa-arrow-up text-secondary"> Up Vote</i>
                                        <i onClick={() => {
                                            hanleClickDecrease(index)
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
