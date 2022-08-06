import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAgents } from '../redux/actions/agents';



export function Agents() {
    const dispatch = useDispatch();
    const { agents } = useSelector(state => state.agentReducer);

    useEffect(() => {
        dispatch(fetchAgents());
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Asset List</h4>
                            <p className="card-description">
                                Lists of Available Agents
                                </p>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th> # </th>
                                            <th> Full Name </th>
                                            <th> State </th>
                                            <th> Address </th>
                                            <th> Phone Number </th>
                                            <th> Status </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agents.map((agent,index) => (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{agent.lastName && ' ' && agent.firstName}</td>
                                                <td>{agent.state}</td>
                                                <td>{agent.address}</td>
                                                <td>{agent.phoneNumber}</td>
                                                <td>{agent.status}</td>
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


export default Agents;
