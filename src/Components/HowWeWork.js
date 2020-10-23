import React from 'react';
import {
    Container,
    Row,
    Col
  } from "reactstrap";

class HowWeWork extends React.Component {

    render() {
        return(
            <div>
                <h2 style={{textAlign:'center'}} className="mt-5"><b>HOW WE WORK?</b></h2>
                <div className="container-box">
                    <div className="row justify-content-lg-center align-items-center">
                        <div className="col-xs-3">
                            <div className="card howwework">
                                <img src={require("../images/1.jpg")} alt="..." className="img-responsive" />
                                <h2 className="howweworkHeading">Post Your Requirement</h2>
                            </div> 
                        </div>       
                        <div className="col-xs-1">
                            <span className="fas fa-arrow-right fa-5x" aria-hidden="true"></span>
                        </div> 
                        <div className="col-xs-3">
                            <div className="card howwework">
                                <img src={require("../images/2.jpg")} alt="..." className="img-responsive" />
                                <h2 className="howweworkHeading">Choose Contractor</h2>                            
                            </div> 
                        </div> 
                        <div className="col-xs-1">
                            <span className="fas fa-arrow-right fa-5x" aria-hidden="true"></span>
                        </div>
                    <div className="col-xs-3">
                        <div className="card howwework">
                            <img src={require("../images/3.jpg")} alt="..." className="img-responsive" />
                            <h2 className="howweworkHeading">Get Daily Reports</h2>
                        </div>
                    </div>
                    </div>
                    <h2 style={{fontWeight:'600', fontSize:'50px',marginTop:'5%', textAlign:'center'}} className="mb-4">WE PROVIDE YOU <span style={{color:'gold'}}>CONTRACTORS!</span></h2>
                    <div className="margin">
                        <div className="row">
                            <div className="col-lg-4 col-md-4  col-xs-12">
                                <div className="card card-block bg-warning opacity-0h5 text-white">
                                    <div className="view overlay">
                                        <img src={require("../images/4.jpg")} alt="..." className="img-fluid  mx-auto d-block" style={{width: "-webkit-fill-available"}} />
                                    </div>
                                    <div className="card-footer" style={{background:'gold', border:'none'}} >
                                        Civil Contractor
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12">
                                <div className="card card-block bg-warning opacity-0h5 text-white">
                                    <div className="view overlay">
                                        <img src={require("../images/5.jpg")} alt="..." className="img-fluid  mx-auto d-block" style={{width: "-webkit-fill-available"}} />
                                    </div>
                                    <div className="card-footer" style={{background:'gold', border:'none'}}>
                                        Electrical Contractor
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12">
                                <div className="card card-block bg-warning opacity-0h5 text-white">
                                    <div className="view overlay">
                                        <img src={require("../images/6.jpg")} alt="..." className="img-fluid mx-auto d-block" style={{width: "-webkit-fill-available"}} />
                                    </div>
                                    <div className="card-footer" style={{background:'gold', border:'none'}}>
                                        Carpenter Contractor
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <h5 style={{color:'gold',marginTop:'60px',fontSize:'35px', fontWeight:'600'}}>KNOW MORE
                                <i className='fas fa-angle-double-right ml-1 fa-lg' style={{color:'black'}}></i>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="bg img-responsive">
                    <div className="layer">
                        <h2>REASONS TO CHOOSE <span className="black">APNAHOME</span></h2>
                        <div className="center">
                            <div className="row">
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="card">
                                        <img className="card-img-top img-fluid" alt="..." src={require("../images/7.jpg")} />
                                        <div className="card-body">
                                            <p className="card-text">
                                                <span className="yellow">Background Checks Of Contractors</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="card">
                                        <img className="card-img-top img-fluid" alt="..." src={require("../images/8.jpg")} />
                                        <div className="card-body">
                                            <p className="card-text">
                                                <span className="yellow">Quality As Per Project Specification</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="card">
                                        <img className="card-img-top img-fluid" alt="..." src={require("../images/9.jpg")} />
                                        <div className="card-body">
                                            <p className="card-text">
                                                <span className="yellow">Complete Transparency</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="card">
                                        <img className="card-img-top img-fluid" alt="..." src={require("../images/10.jpg")} />
                                        <div className="card-body">
                                            <p className="card-text">
                                                <span className="yellow">Weekly Work Reports</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HowWeWork;