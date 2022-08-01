import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { createFare } from '../redux/actions/profile';


import places from '../data/places'

export function RatesForm(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        size: "",
        cost: "",
    });

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
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
                                            <select name="origin" value={formData.origin} onChange={handleInput} className="form-control">
                                                <option value=""> Choose a location </option>
                                                {places.map(place => (<option>{place}</option>))}
                                            </select>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"> Destination </label>
                                        <div className="col-sm-9">
                                            <select name="destination" value={formData.destination} onChange={handleInput} className="form-control">
                                                <option value=""> Choose a location </option>
                                                {places.map(place => (<option>{place}</option>))}
                                            </select>
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
