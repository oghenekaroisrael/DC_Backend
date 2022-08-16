import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAgents, deleteAgent, assignDefaultAgent } from '../redux/actions/agent';



export function Agents() {
    const dispatch = useDispatch();
    const { agents } = useSelector(state => state.agentReducer);

    useEffect(() => {
        dispatch(fetchAgents());
    }, []);

    const handleDeleteAgent = (id) => {
        dispatch(deleteAgent(id));
    }

    const handleSetDefaultAgent = (id) => {
        dispatch(assignDefaultAgent(id));
        window.location.reload();
    }

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
                                            <th><center>Action</center></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agents.map((agent,index) => (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{agent.lastName+' '+agent.firstName}</td>
                                                <td>{agent.state}</td>
                                                <td>{agent.address}</td>
                                                <td>{agent.phoneNumber}</td>
                                                <td>{agent.status}</td>
                                                <td style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-evenly'
                                                    }}>
                                                        <Link to={`/agent-view/${agent.id}`}>
                                                            <i className='btn btn-white btn-lg mdi mdi-eye border-white'></i>
                                                        </Link>
                                                        <button className={`btn btn-${agent.defaultAgent === true ? 'disabled' : 'info'} btn-icon-text`}
                                                        onClick={() => handleSetDefaultAgent(agent.id)}>
                                                            {agent.defaultAgent === true ? 'Default Agent' : 'Make Default'}
                                                        </button>
                                                    <button className="btn btn-danger btn-icon-text"
                                                    onClick={() => handleDeleteAgent(agent.id)}>
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
