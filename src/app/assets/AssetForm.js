import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { createAsset } from '../redux/actions/assets';
import { useHistory } from 'react-router-dom';


// This Javascript file comprises of codes that allows the provider to add new assets to the system



// function formatDate(input) {
//     if (!input) {
//         return;
//     }
//     let date = new Date(input);
//     let output = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
//     return output;
// }

export function AssetForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        type: "",
        registrationNumber: "",
        // color: "",
        // model: "",
        description: "",
    });

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (formData.type && formData.registrationNumber && formData.description) {
            dispatch(createAsset(formData))
            history.push("/assets")
        } else {
            alert("Oops. An error Occurred.")
        }
    }

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> Add Asset </h3>
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
                            <p className="card-description">Fill in the form to add an asset</p>
                            <div>
                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Asset Type</label>
                                        <div className="col-sm-9">
                                            <select name="type" value={formData.type} onChange={handleInput} className="form-control">
                                                <option value="" selected="Selected" hidden="hidden" >Choose Asset Type</option>
                                                <option>Bike</option>
                                                <option>Pickup</option>
                                                <option>Van</option>
                                                <option>Truck</option>
                                                <option>Trailer</option>
                                                <option>Tanker</option>
                                                <option>Barge</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"> Registration Number </label>
                                        <div className="col-sm-9">
                                            <Form.Control name="registrationNumber" value={formData.registrationNumber} onChange={e => setFormData({...formData, registrationNumber: e.target.value.toUpperCase()})} type="text" />
                                        </div>
                                    </Form.Group>
                                </div>

                                {/* <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"> Color </label>
                                        <div className="col-sm-9">
                                            <Form.Control name="color" value={formData.color} onChange={handleInput} type="text" />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"> Model </label>
                                        <div className="col-sm-9">
                                            <Form.Control name="model" value={formData.model} onChange={handleInput} type="text" />
                                        </div>
                                    </Form.Group>
                                </div> */}

                                <div className="col-md-8">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label"> Description </label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                <textarea onChange={handleInput} name="description" value = {formData.description} className="form-control" rows={8}>
                                                </textarea>
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


export default AssetForm;