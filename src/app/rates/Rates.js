import React, { useEffect } from 'react';

import { fetchFares } from '../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';

export function Rates() {
    const dispatch = useDispatch();
    const { fares } = useSelector(state => state.profileReducer);

    useEffect(() => {
        dispatch(fetchFares());
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title"> Delivery Rates </h4>
                            <p className="card-description">
                                Lists of Delivery Rates
                            </p>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th> # </th>
                                            <th> Origin </th>
                                            <th> Destination </th>
                                            <th> Size </th>
                                            <th> Cost </th>
                                            <th style={{ width: '228px' }} > Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fares && fares.map((fare, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{fare.origin}</td>
                                                <td>{fare.destination}</td>
                                                <td>{fare.size}</td>
                                                <td>{fare.cost}</td>
                                                <td style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <button className="btn btn-primary btn-lg "> VIEW </button>
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


export default Rates;
