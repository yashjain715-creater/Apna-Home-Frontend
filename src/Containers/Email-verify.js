import React from 'react';
import axios from 'axios';
import '../App.css';
import { 
    Container, 
    Button } from "reactstrap";

class EmailVerify extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
       
        axios.get(`http://127.0.0.1:8000/accounts/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    redirect = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="section section-hero email-verify section-shaped">
                
                    <div className="shape shape-style-1 shape-default">
                    <span className="span-150" />
                    <span className="span-50" />
                    <span className="span-50" />
                    <span className="span-75" />
                    <span className="span-100" />
                    <span className="span-75" />
                    <span className="span-50" />
                    <span className="span-100" />
                    <span className="span-50" />
                    <span className="span-100" />
                    </div>
                    <Container>
                        <div className="display-1 text-center text-white mt-5">Congratulations! Your Email is Verified</div>
                        <div className="text-center mt-5">
                            <Button color="default" onClick={this.redirect} type="button">
                                Login
                            </Button>
                        </div>
                    </Container>
                    <div className="separator separator-bottom separator-skew zindex-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                        className="fill-white"
                        points="2560 0 2560 100 0 100"
                        />
                    </svg>
                    </div>
                
            </div>
        )
    }
}

export default EmailVerify;