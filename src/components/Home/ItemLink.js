import React from 'react'
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

function IteItemLink() {
    return (
        <div>


            <Row>
                <Col className="text-center mt-5">
                    <span className="mt-3 border text-center py-4 px-2 bg-light width  ">
                        <Link to="/added" className="px-3 h2 text-decoration-none">   <button className="btn btn-secondary "><span className="h2 ">+</span>  </button>  SUBMIT A LINK </Link>
                    </span>
                    <hr />
                </Col>
            </Row>



        </div>
    )
}

export default IteItemLink
