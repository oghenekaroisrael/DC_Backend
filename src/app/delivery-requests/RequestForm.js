import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { endpoints, getHeaders } from "../redux/helpers/api";
// This file helps you manage delivery request. To view this file. 
// click on the VIEW button in the request page

export function RequestForm() {
    const params = useParams();
    const [requests, setrequests] = useState({});
    const [agents, setAgents] = useState([]);
    const [assignedAgent, setAssignedAgent] = useState({});

    const assignThisAgent = (deliveryId, agentId) => {
        fetch(endpoints.API_HOME + `/providers/agents/assign/${deliveryId}/${agentId}`, {
            headers: getHeaders(true),
            method: 'POST',
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Oops. An Error Occured")
                }
            })
            .then(data => {
                console.log(data.payload);
                window.location.reload();
            });
    }

            useEffect(() => {
                fetch(endpoints.API_HOME + `/deliveries/${params.id}`, {
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
                        if (data?.payload?.AgentId != null) {
                            fetch(endpoints.API_HOME + `/providers/agents/${data?.payload?.AgentId}`, {
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
                                    setAssignedAgent(data.payload);
                                });
                        }
                    });
            }, []);
            

            useEffect(() => {
                fetch(endpoints.API_HOME + '/providers/agents', {
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
                        setAgents(data.payload);
                    });
            }, []);

        return (
            <div>
                <div className="page-header">
                    <p>Delivery Request Details</p>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <div className='card-title'>
                            <h4 className="card-description">Delivery Details </h4>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <label className="col-sm-5 col-form-label text-info">Sender Name</label>
                                    <label className="col-sm-7 col-form-label">{requests?.senderName}</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                     <label className="col-sm-5 col-form-label text-info">Reciepient Name</label>
                                    <label className="col-sm-7 col-form-label">{requests?.recipientName}</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                     <label className="col-sm-5 col-form-label text-info">PickUp Phone Number</label>
                                    <label className="col-sm-7 col-form-label">{requests?.pickupPhoneNumber}</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <label className="col-sm-5 col-form-label text-info">DropOff Phone Number</label>
                                    <label className="col-sm-7 col-form-label">{requests?.dropoffPhoneNumber}</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                     <label className="col-sm-5 col-form-label text-info">PickUp Area</label>
                                    <label className="col-sm-7 col-form-label">{requests?.pickupArea}</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <label className="col-sm-5 col-form-label text-info">DropOff Area</label>
                                    <label className="col-sm-7 col-form-label">{requests?.dropoffArea}</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                     <label className="col-sm-5 col-form-label text-info">PickUp Street Address</label>
                                    <label className="col-sm-7 col-form-label">{requests?.pickupStreetAddress}</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <label className="col-sm-5 col-form-label text-info">DropOff Street Address</label>
                                    <label className="col-sm-7 col-form-label">{requests?.dropoffStreetAddress}</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 ">
                                <div className="row">
                                     <label className="col-sm-5 col-form-label text-info">Description</label>
                                    <label className="col-sm-7 col-form-label">{requests?.description}</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                     <label className="col-sm-5 col-form-label text-info">Instruction</label>
                                    <label className="col-sm-7 col-form-label">{requests?.instructions}</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                     <label className="col-sm-5 col-form-label text-info">Comment</label>
                                    <label className="col-sm-7 col-form-label">{requests?.comment}</label>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-2'>
                                <label className='mr-3 text-info'>Priority : </label>
                                <div className={`badge badge-${requests?.priority == 'high' ? 'warning' : 'primary'}`}>{requests?.priority}</div>
                            </div>
                            <div className='col-sm-2'>
                                <label className='mr-3 text-info'>Size : </label>
                                <div className='badge badge-primary'>{requests?.size}</div>
                            </div>
                            <div className='col-sm-2'>
                                <label className='mr-3 text-info'>Item Count : </label>
                                {requests?.itemCount}
                            </div>
                            <div className='col-sm-2'>
                                <label className='mr-3 text-info'>Status : </label>
                                <div className={`badge badge-${requests?.status === 'processing' ? 'default' : requests?.status === 'started' ? 'info' : 'success'}`}>{requests?.status}</div>
                            </div>
                        </div>
                        <div className='row'>
                                <label className='col-sm-2 text-info'>Assigned Agent : </label>
                                <label className='col-sm-10'>{assignedAgent.lastName+" "+assignedAgent.firstName}</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 grid margin">
                        <div className="card">
                            <div className="card-body">
                                <div className='card-title'>
                                    <h4 className="card-description">Assign Agent</h4>
                                </div>
                                {agents.map((agent, index) => (
                                    <div className="d-flex align-items-center mb-3" key={index}>
                                        <p className="text-light ml-2 col-6 mb-0 font-weight-medium"> {agent?.lastName+" "+agent?.firstName}</p>
                                        <div className="col-2">
                                            <div className={`badge badge-${agent?.status == 'offline' ? 'danger' : 'success'}`}>
                                                {agent?.status}
                                            </div>
                                        </div>
                                        {agent?.id != requests.AgentId &&
                                        <button onClick={()=>assignThisAgent(requests?.id, agent?.id)}  type="button" className="btn btn-outline-primary btn-icon-text">
                                            Asssign
                                            <i className="mdi mdi-account-check btn-icon-append"></i>
                                        </button>}
                                        {agent?.id == requests.AgentId &&
                                        <button onClick={()=>assignThisAgent(requests?.id, agent?.id)} disabled type="button" className="btn btn-outline-default btn-icon-text">
                                            Asssigned
                                            <i className="mdi mdi-account-check btn-icon-append"></i>
                                        </button>}
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}


export default RequestForm