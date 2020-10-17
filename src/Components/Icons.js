import React from 'react';
import {
    Container,
    Row,
    Col
  } from "reactstrap";

class Icon extends React.Component {

    render() {
        var items = [
            ["../assets/img/theme/team-1-800x800.jpg",
            'Civil Contractors'],
            ["../assets/img/theme/team-1-800x800.jpg",
            'Civil Contractors'],
            ["../assets/img/theme/team-1-800x800.jpg",
            'Civil Contractors'],
            ["../assets/img/theme/team-1-800x800.jpg",
            'Civil Contractors'],
            ["../assets/img/theme/team-1-800x800.jpg",
            'Civil Contractors'],
            ["../assets/img/theme/team-1-800x800.jpg",
            'Civil Contractors'],
        ]
        return(
            <Container className="mt-5">
                <Row>
                    {
                        items.map(
                            (items, index) => 
                                <Col xs="4" lg="2" key={index}>
                                    <div>
                                    <img
                                        alt="..."
                                        className="img-fluid rounded-circle shadow img-center"
                                        src={require('../assets/img/theme/team-1-800x800.jpg')}
                                        style={{ width: "70px" }}
                                        />
                                    <h5 className="text-center">{items[1]}</h5>
                                    </div>
                                </Col>
                        )
                    }
                </Row>
            </Container>
        )
    }
}

export default Icon;