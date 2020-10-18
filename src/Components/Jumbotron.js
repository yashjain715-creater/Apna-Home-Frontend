import React from "react";
import { 
    Container, 
    Row, 
    Col, 
    Button,
    } from "reactstrap";
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import * as actions from '../store/Actions/Actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import {cities, types} from './typesFilter';

const getSuggestionsCity = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : cities.filter(lang =>
    lang.city.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionsType = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : types.filter(lang =>
    lang.type.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValueCity = suggestion => suggestion.city;

const getSuggestionValuetype = suggestion => suggestion.type;

const renderSuggestionCity = suggestion => (
  <div>
    {suggestion.city}
  </div>
);

const renderSuggestionType = suggestion => (
  <div>
    {suggestion.type}
  </div>
);

class Hero extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestionsCity: [],
      suggestionsType: [],
      type: '',
      city: ''
    }
  }

  onChangeCity = (event, { newValue }) => {
    this.setState({
      city: newValue
    });
  };

  onChangeType = (event, { newValue }) => {
    this.setState({
      type: newValue
    });
  };

  onSuggestionsFetchRequestedCity = ({ value }) => {
    this.setState({
      suggestionsCity: getSuggestionsCity(value)
    });
  };

  onSuggestionsFetchRequestedType = ({ value }) => {
    this.setState({
      suggestionsType: getSuggestionsType(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestionsCity: [],
      suggestionsType: []
    });
  };
  
  Search = (e) => {
    e.preventDefault();
    const { city, type } = this.state;
  
    if(city === ''){
      alert('Please Enter City');
    } else if(type === ''){
      alert('Please Enter Type')
    } else {
      var types = null;
      var citys = null;
      if(type === 'Civil Contractor') {
          types = 'CivCon';
      }
      if(type === 'Electric Contractor') {
          types = 'EleCon';
      }
      if(type === 'POP Contractor') {
          types = 'POP';
      }
      if(type === 'Stone Contractor') {
          types = 'Ston';
      }
      if(type === 'Tiles Contractor') {
          types = 'Tile';
      }
      if(type === 'Polishing Contractor') {
          types = 'Pol';
      }
      if(type === 'Woodwork Contractor') {
          types = 'WoWo';
      }
      if(type === 'False Cieling Contractor') {
          types = 'FalCie';
      }
      if(type === 'Fabrication Contractor') {
          types = 'Fabr';
      }
      if(type === 'AC Contractor') {
          types = 'AC';
      }
      if(type === 'Plumbing Contractor') {
          types = 'Plum';
      }
      if(city === 'Delhi') {
          citys = 'DL'
      } else if(city === 'Noida') {
          citys = 'NO'
      } else if(city === 'Gurgaon') {
          citys = 'GR'
      } else if(city === 'Faridabad') {
          citys = 'FR'
      }
      this.props.getContractorJson(city, type);
      this.props.history.push(`/contractors/${city}/${type}`); 
    }
  }
 

  render() {
    const { city, suggestionsCity, type, suggestionsType } = this.state;
    const inputPropsCity = {
      placeholder: 'Type Your City',
      value: city,
      onChange: this.onChangeCity
    };

    const inputPropsType = {
      placeholder: 'Search Contractors',
      value: type,
      onChange: this.onChangeType
    };
    
    return (
      <>
        <div className="position-relative Image">
          <section className="section section-hero section-shaped layer">
            <Container className="shape-container d-flex align-items-center py-lg container-box">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col lg="9">
                    <h1 className="welcome" style={{marginLeft:'20px'}}>WELCOME</h1>
                    <p className="text-white" style={{fontWeight:'500', marginLeft: '20px'}}>
                      CREATING A BRIGHTER FUTURE, TOGETHER
                    </p>
                    <form onSubmit={this.Search}>
                    <Row>
                      <Col sm="3" xs="3" className="mt-5 mr-3">
                        <div style={{background:'gold', width:'200px'}}>
                          <Autosuggest
                            id="cityselect"
                            suggestions={suggestionsCity}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedCity}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValueCity}
                            renderSuggestion={renderSuggestionCity}
                            inputProps={inputPropsCity}
                          />
                          <FontAwesomeIcon icon={faSearchLocation} className="icons fa-lg" style={{top:'8px',  left:'185px'}} />
                        </div>
                      </Col>
                      <Col sm="3" xs="3" className="mt-5 mx-3">
                      <Autosuggest
                          id="typeselect"
                          suggestions={suggestionsType}
                          onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedType}
                          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                          getSuggestionValue={getSuggestionValuetype}
                          renderSuggestion={renderSuggestionType}
                          inputProps={inputPropsType}
                        />
                        <i className="fas faSearch" />
                        <FontAwesomeIcon icon={faSearch} className="icons fa-lg" style={{top:'8px', right:'0', left:'185px'}} />
                      </Col>
                      <Col sm="3" className="px-0 pr-3">
                        <div className="text-center mt-5 ml-3">
                          <Button color="info" id="submitbtn" type="submit">
                              Submit
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    </form>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getContractorJson: (city, type) => {
          dispatch(actions.filteringContractors(city, type));
      }
  };
}

export default connect(null,mapDispatchToProps)(Hero);
