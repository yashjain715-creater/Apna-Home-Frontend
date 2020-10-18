import React from 'react';
import {
    Container,
    Row,
    Col
  } from "reactstrap";

class HowWeWork extends React.Component {

    render() {
        return(
            <div className="mt-5 container-box">
                <Row>
                    <Col xs="4" lg="2">
                        <div>
                        <img
                            alt="..."
                            className="img-fluid rounded-circle shadow img-center"
                            src={require('../assets/img/theme/team-1-800x800.jpg')}
                            style={{ width: "70px" }}
                            />
                        <h5 className="text-center">Hello</h5>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default HowWeWork;