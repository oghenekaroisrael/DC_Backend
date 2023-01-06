import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { createFare } from '../redux/actions/profile';
import { fetchLocations } from '../redux/actions/location';
import AsyncSelect from 'react-select/async';
import { endpoints, getHeaders } from '../redux/helpers/api';


export function RatesForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [places, setPlaces] = useState([]);
    const [selectedFromOption, setSelectedFromOption] = useState(null);
    const [selectedToOption, setSelectedToOption] = useState(null);
    const [normalFromSelectOption, setNormalFromSelectOption] = useState([]);
    const [normalToSelectOption, setNormalToSelectOption] = useState([]);
    const { locations } = useSelector(state => state.locationReducer);

    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        size: "",
        cost: "",
    });
    const customStyles = {
        control: (base, state) => ({
          ...base,
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "yellow" : "green",
          // Removes weird border around container
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "red" : "blue"
          }
        }),
        option: (styles) => {
           return { ...styles,
            color: '#000',
           };
        }
      };

    const searchLocation = (inputData, callback) => {
        fetch(endpoints.API_HOME + `/locations/search?search=${inputData}&page=1&limit=20`, {
            headers: getHeaders(true)
        })
            .then (res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Oops. An Error Occured");
                }
            })
            .then (data => {
                const tempPlaces = [];
                data?.payload?.forEach((element) => {
                    tempPlaces.push({
                      label: `${element.name}`,
                      value: element.id,
                    });
                  });
                callback(tempPlaces);
            }).catch(err => {
                alert("Oops. An Error Occured");
            })
    }

    const onFromSearchChange = (selectedOption) => {
        if (selectedOption) {
          setSelectedFromOption(selectedOption);
          setFormData({ ...formData, origin: selectedOption.label });
        }
      };
    const handleFromChange = (normalSelectOption) => {
        setNormalFromSelectOption(normalSelectOption);
    };

    const onToSearchChange = (selectedOption) => {
        if (selectedOption) {
          setSelectedToOption(selectedOption);
          setFormData({ ...formData, destination: selectedOption.label });
        }
      };
    const handleToChange = (normalSelectOption) => {
        setNormalToSelectOption(normalSelectOption);
    };
    

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        console.log(formData);
        if (formData.origin && formData.destination && formData.size && formData.cost) {
            dispatch(createFare(formData));
            history.push("/rates")
        } else {
            alert("Oops. An error Occurred.")
        }
    }

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> Add New Flat Rates </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Assets Management</a></li>
                        {/* <li className="breadcrumb-item active" aria-current="page">Form elements</li> */}
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Required Information</h4>
                            <p className="card-description">Fill in the form to add a new flat rate</p>
                            <div>
                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Origin</label>
                                        <div className="col-sm-9">
                                            <AsyncSelect
                                                value={selectedFromOption}
                                                loadOptions={searchLocation}
                                                placeholder="Origin"
                                                name={'origin'}
                                                onChange={onFromSearchChange}
                                                styles={customStyles}
                                                defaultOptions={true}
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"> Destination </label>
                                        <div className="col-sm-9">
                                            <AsyncSelect
                                                value={selectedToOption}
                                                loadOptions={searchLocation}
                                                placeholder="Destination"
                                                name={'destination'}
                                                onChange={onToSearchChange}
                                                styles={customStyles}
                                                defaultOptions={true}
                                            />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"> Size </label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                <select name="size" value={formData.size} onChange={handleInput} className="form-control">
                                                    <option value=""> Select </option>
                                                    <option value="small">Small</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="large">Large</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"> Cost </label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                <Form.Control name="cost" value={formData.cost} className="form-control" onChange={handleInput} type="text" />
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <br />

                            <form className="forms-sample">
                                <div>
                                    <button type="button"
                                        onClick={handleSubmit}
                                        className="btn btn-primary btn-lg btn-block">
                                        Submit
                                    </button>
                                    {/* <button onClick={() => null} type="button" className="btn btn-primary mr-2">Submit</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

// const mapStateToProps = (state) => ({
// user: state.authReducer.user,
// companyDetails: state.profileReducer.companyDetails,
// managerDetails: state.profileReducer.managerDetails,
// fetchingProfile: state.profileReducer.fetchingProfile,
// });

export default RatesForm;
