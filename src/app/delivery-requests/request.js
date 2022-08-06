import React, { useEffect, useState } from 'react';
import { endpoints, getHeaders } from "../redux/helpers/api"

import moment from 'moment';




export function Request() {

    const [requests, setrequests] = useState([]);

    useEffect(() => {
        fetch(endpoints.API_HOME + '/deliveries/', {
            headers: getHeaders(true)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Oops. An Error Occured")
                }
            })
            .then(data => {
                setrequests(data.payload);
            })
    }, []);

    function formatAMPM(str) {
        if (!str) return '';


        var date = new Date(str);
        var fullDate = moment(date).format("MM/DD/YYYY");
        return fullDate 
    }

 

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Active Deliveries</h4>
                            <p className="card-description">
                                Monitor your deliveries
                            </p>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Created</th>
                                            <th>PickUp Location</th>
                                            <th>DropOff Location</th>
                                            <th>PhoneNumber</th>
                                            <th>Size</th>
                                            <th>Priority</th>
                                            <th>Status</th>
                                            <th style={{width: '228px'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map(request => (
                                            <tr>
                                                <td>{formatAMPM(request.createdAt)}</td>
                                                <td>{request.pickupStreetAddress + ". " + request.pickupArea}</td>
                                                <td>{request.dropoffStreetAddress + ". " + request.dropoffArea}</td>
                                                <td>{request.pickupPhoneNumber}</td>
                                                <td>{request.size}</td>
                                                <td>{request.priority}</td>
                                                <td>{request.status}</td>
                                                <td style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-evenly'
                                                }}>
                                                    <button className="btn btn-primary btn-lg"> VIEW </button>
                                                    <button className="btn btn-danger btn-icon-text">
                                                        <i className="mdi mdi-delete"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Request