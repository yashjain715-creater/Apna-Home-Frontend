import React from 'react';
import './styles/Footer.css';
import 'react-bootstrap';
import {
    Form,
    Button,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
  } from "reactstrap";
import '../App.css';
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";

import PinInterest from '../images/logos/pinterest.png';
import Instagram from '../images/logos/instagram.png';
import Twitter from '../images/logos/twitter.png';
import Wifi from '../images/logos/wifi.png';
import Youtube from '../images/logos/youtube.png';

class Footer extends React.Component{
    render() {
        return(
            <>
                <div className="footer">
                        <Container fluid={true}>
                            <Row xs="1">
                                <Col xs="2">
                                    <div className="footerelement">
                                        <h2>Contractors</h2>
                                        <hr />
                                        <Nav vertical>
                                            <NavItem>
                                                <NavLink href="#">Electrical</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">Civil</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">General</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">Construction</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">Domestic</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">Prime</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="footerelement">
                                        <h2>Company</h2>
                                        <hr />
                                        <Nav vertical>
                                            <NavItem>
                                                <NavLink href="#">About</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">Our Policy</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <div className="footerelement">
                                        <h2>Support</h2>
                                        <hr />
                                        <Nav vertical>
                                            <NavItem>
                                                <NavLink href="#">Contact</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">Terms & Conditions</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Col>
                                <Col xs="4">
                                    <div className="footerelement contact-form">
                                        <h2>Contact Form</h2>
                                        <hr />
                                        <Form>
                                            <FormGroup>
                                                <Label for="FullName">Full Name</Label>
                                                <Input type="text" name="fullname" id="FullName" placeholder="John Doe" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="EmailAddress">Email Address</Label>
                                                <Input type="text" name="email" id="EmailAddress" placeholder="JohnDoe@mail.com" />
                                            </FormGroup>
                                            <Button className="form-submit">Submit</Button>
                                        </Form>
                                    </div>
                                </Col>
                                <Col xs="4">
                                    <div className="footerelement about">
                                        <h2>About Apna Home</h2>
                                        <hr />
                                        <div className="about-body">
                                            <p>
                                                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
                                            </p>
                                            <p>
                                                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                                                Lorem Ipsum Lorem Ipsum
                                            </p>
                                            <p>
                                                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                                            </p>
                                        </div>
                                        <div className="about-links">
                                            <span>
                                                <a href="#"><img src={PinInterest} alt="PinInterest"/></a>
                                            </span>
                                            <span>
                                                <a href="#"><img src={Wifi} alt="PinInterest"/></a>
                                            </span>
                                            <span>
                                                <a href="#"><img src={Instagram} alt="Instagram"/></a>
                                            </span>
                                            <span>
                                                <a href="#"><img src={Twitter} alt="Twitter"/></a>
                                            </span>
                                            <span>
                                                <a href="#"><img src={Youtube} alt="YouTube"/></a>
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div className="footerline">
                            &copy; CopyRight 2017 All Rights Reserved
                        </div>
                </div>
            </>
        )
    }
}

export default Footer;