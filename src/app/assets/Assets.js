import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAssets } from '../redux/actions/assets';



export function Assets() {
    const dispatch = useDispatch();
    const { assets } = useSelector(state => state.assetReducer);

    useEffect(() => {
        dispatch(fetchAssets());
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Asset List</h4>
                            <p className="card-description">
                                Lists of Available Assets
                                </p>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th> # </th>
                                            <th> Asset Type </th>
                                            <th> License Number </th>
                                            <th> Status </th>
                                            <th style={{width: '228px'}} > Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assets.map((asset,index) => (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{asset.type}</td>
                                                <td>{asset.registrationNumber}</td>
                                                <td>{asset.status}</td>
                                                <td style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-evenly'


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


export default Assets;
