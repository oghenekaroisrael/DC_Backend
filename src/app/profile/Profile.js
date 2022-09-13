import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchProfile, updateCompanyDetails, updateManagerDetails, updateOwnerDetails } from '../redux/actions/profile';

import identificationMethods from '../data/identification-methods'
import banks from '../data/banks'
import { endpoints, getHeaders } from '../redux/helpers/api';

function formatDate(input) {
    if (!input){
        return;
    }
    let date = new Date(input);
    let output = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    return output;
}

export function Profile(props) {
    const key = 'sk_test_f0ceeebbc0541de58d6bf05fe0959da518520043';

    const [companyDetails, setCompanyDetails] = useState({});

    const [companyOwnerDetails, setCompanyOwnerDetails] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        address: "",
        whatsapp: "",
        phoneNumber: "",
        phoneNumber2: "",
        providerId: 1,
    });

    const [managerDetails, setManagerDetails] = useState();

    const [banks, setbanks] = useState([]);

    const [currentBankDetail, setCurrentBankDetail] = useState({});

    const [bankdetails, setbankdetails] = useState({
        "business_name": "",
        "bank_code": "",
        "account_number": "",
        "percentage_charge": 0.2
    });
    

    useEffect(() => {
        props.fetchProfile();
        fetch('https://api.paystack.co/bank?country=nigeria')
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Oops. An Error Occured")
                }
            })
            .then(data => {
                setbanks(data.data);
        });
        fetch(endpoints.API_HOME + '/providers/bank/details', {
            headers: getHeaders(true),
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Oops. An Error Occured");
            }
        }).then(data => {
            console.log(data.payload.subaccount_code);
            fetch(`https://api.paystack.co/subaccount/${data.payload.subaccount_code}`,{
                headers: {
                    Authorization: `Bearer ${key}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Oops. An Error Occured")
                }
            })
            .then(data => {
                setCurrentBankDetail({
                    subaccount_code: data.data.subaccount_code,
                    business_name: data.data.business_name,
                    settlement_bank: data.data.settlement_bank,
                    account_number: data.data.account_number,
                    settlement_schedule: data.data.settlement_schedule,
                });
        });
        }).catch(err => {
            alert("Oops. An Error Occured");
        });
    }, []);

    const handleInputCompany = (e) => {
        setCompanyDetails({
            ...companyDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleInputBankDetails = (e) => {
        setbankdetails({
            ...bankdetails,
            [e.target.name]: e.target.value
        })
    }

    const handleInputManager = (e) => {
        setManagerDetails({
            ...managerDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleInputOwner = (e) => {
        setCompanyOwnerDetails({
            ...companyOwnerDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdateCompanyDetails = () => {
        if (Object.keys(companyDetails).length) {
            props.updateCompanyDetails(companyDetails);
            setCompanyDetails(null)
        }
    }

    const handleUpdateBankDetails = () => {
        fetch('https://api.paystack.co/subaccount', {
            method: "POST",
            body: JSON.stringify(bankdetails),
            headers: {
                Authorization: `Bearer ${key}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 201) {
                return res.json()

            } else {
                alert("Oops. An Error Occured");
            }
        }).then(data => {
            fetch(endpoints.API_HOME + '/providers/bank/details', {
                method: "POST",
                headers: getHeaders(true),
                body: JSON.stringify({subaccount_code: data.data.subaccount_code}),
            }).then(res => {
                if (res.status === 200) {
                    window.location.reload();
                } else {
                    alert("Oops. An Error Occured");
                }
            }).catch(err => {
                alert("Oops. An Error Occured");
            });
        }).catch(err => {
            alert("Oops. An Error Occured");
        });
    }

    const handleUpdateManagerDetails = () => {
        if (Object.keys(managerDetails).length) {
            props.updateManagerDetails(managerDetails);
            setManagerDetails(null)
        }
    }

    const handleUpdateOwnerDetails = () => {
        if (Object.keys(companyOwnerDetails).length) {
            props.updateOwnerDetails(companyOwnerDetails);
            setCompanyOwnerDetails(null)
        }
    }

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> Manage your profile </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Profile Management</a></li>
                        {/* <li className="breadcrumb-item active" aria-current="page">Form elements</li> */}
                    </ol>
                </nav>
            </div>
            <div className="row">

                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Company</h4>
                            <form className="form-sample">
                                <p className="card-description">Company Details </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Company Name</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" value={props.user.name} className="bg-dark" readOnly />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phone_number" defaultValue={props.companyDetails.phone_number} onChange={handleInputCompany} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <Form.Control type="email" value={props.user.email} className="bg-dark" readOnly />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Website</label>
                                            <div className="col-sm-9">
                                                <Form.Control
                                                    name="website" defaultValue={props.companyDetails.website} onChange={handleInputCompany}
                                                    type="url"
                                                    placeholder="https://example.com"
                                                    pattern="https://.*" size="30"
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">CAC Number</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="cac_no" defaultValue={props.companyDetails.cac_no} onChange={handleInputCompany} type="text" placeholder="" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">VAT Number</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="vat_no" defaultValue={props.companyDetails.vat_no} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">TIN Number</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="tin_no" defaultValue={props.companyDetails.tin_no} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <p className="card-description"> Address </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Address 1</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="address_1" defaultValue={props.companyDetails.address_1} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">State</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="state" defaultValue={props.companyDetails.state} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Address 2</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="address_2" defaultValue={props.companyDetails.address_2} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Postcode</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="post_code" defaultValue={props.companyDetails.post_code} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">City</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="city" defaultValue={props.companyDetails.city} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Country</label>
                                            <div className="col-sm-9">
                                                <select name="country" defaultValue={props.companyDetails.country} onChange={handleInputCompany} className="form-control">
                                                    <option>Nigeria</option>
                                                </select>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <button onClick={handleUpdateCompanyDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Company Owner</h4>
                            <form className="form-sample">
                                <p className="card-description">Personal Information </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">First Name</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="first_name" defaultValue={companyOwnerDetails.firstName} onChange={handleInputOwner} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phone_number" defaultValue={companyOwnerDetails.phoneNumber} onChange={handleInputOwner} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Last Name</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="last_name" defaultValue={companyOwnerDetails.lastName} onChange={handleInputOwner} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number 2</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phone_number_2" defaultValue={companyOwnerDetails.phoneNumber2} onChange={handleInputOwner} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Other Name</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="other_name" defaultValue={companyOwnerDetails.middleName} onChange={handleInputOwner} type="text" placeholder="Olamide" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Whatsapp</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="whatsapp_number" defaultValue={companyOwnerDetails.whatsapp} onChange={handleInputOwner} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="email" defaultValue={companyOwnerDetails.email} onChange={handleInputOwner} type="email" placeholder="john.doe@gmail.com" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Address</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="address" defaultValue={companyOwnerDetails.address} onChange={handleInputOwner} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <button onClick={handleUpdateOwnerDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Manager</h4>
                            <form className="form-sample">
                                <p className="card-description">Personal Information </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">First Name</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="first_name" defaultValue={props.managerDetails.first_name} onChange={handleInputManager} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phone_number" defaultValue={props.managerDetails.phone_number} onChange={handleInputManager} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Last Name</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="last_name" defaultValue={props.managerDetails.last_name} onChange={handleInputManager} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number 2</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phone_number_2" defaultValue={props.managerDetails.phone_number_2} onChange={handleInputManager} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Other Name</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="other_name" defaultValue={props.managerDetails.other_name} onChange={handleInputManager} type="text" placeholder="Olamide" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Whatsapp</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="whatsapp_number" defaultValue={props.managerDetails.whatsapp_number} onChange={handleInputManager} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="email" defaultValue={props.managerDetails.email} onChange={handleInputManager} type="email" placeholder="john.doe@gmail.com" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Address</label>
                                            <div className="col-sm-9">
                                                <Form.Control name="address" defaultValue={props.managerDetails.address} onChange={handleInputManager} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <button onClick={handleUpdateManagerDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Means of Identification</h4>
                            <p className="card-description"> Show us some ID </p>
                            <form className="forms-sample">
                                <Form.Group>
                                    <label htmlFor="selectIDMethod">Means of Identification</label>
                                    <select key={`id-method-${props.managerDetails.id_method}`} name="id_method" defaultValue={props.managerDetails.id_method} onChange={handleInputManager} className="form-control" id="selectIDMethod">
                                        {/* <option value="">None</option> */}
                                        {identificationMethods.map((option) => (
                                            <option key={`id-method-${option.value}`} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <label>Identification Number</label>
                                    <Form.Control name="id_image_url" defaultValue={props.managerDetails.id_image_url} onChange={handleInputManager} type="text" className="form-control" />
                                </Form.Group>
                                {/* <Form.Group>
                                    <label>Upload an image of your ID</label>
                                    <div className="custom-file">
                                        <Form.Control name="id_image_url" defaultValue={props.managerDetails.id_image_url} onChange={handleInputManager} type="file" className="form-control visibility-hidden" id="customFileLang" lang="es" />
                                        <label className="custom-file-label" htmlFor="customFileLang">Upload ID</label>
                                    </div>
                                </Form.Group> */}
                                <Form.Group>
                                    <label>Issue Date</label>
                                    <Form.Control name="issue_date" defaultValue={formatDate(props.managerDetails.issue_date)} onChange={handleInputManager} type="date" className="form-control" />
                                </Form.Group>
                                <Form.Group>
                                    <label>Expire Date</label>
                                    <Form.Control name="expire_date" defaultValue={formatDate(props.managerDetails.expire_date)} onChange={handleInputManager} type="date" className="form-control" />
                                </Form.Group>
                                <div className="mt-4">
                                    <button onClick={handleUpdateManagerDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Bank Details</h4>
                            <p className="card-description">Please ensure the information you provide is accurate.</p>
                            <form className="forms-sample">
                                <Form.Group>
                                    <label htmlFor="selectBank">Bank Name</label>
                                    <select key={`bank-name-${props.companyDetails.bank_name}`} name="bank_code" defaultValue={currentBankDetail.settlement_bank} onChange={handleInputBankDetails} className="form-control" id="selectBank">
                                        {/* <option value="">None</option> */}
                                        {banks.map((option) => (
                                            <option key={option.slug} value={option.code}>{option.name}</option>
                                        ))}
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <label className="col-form-label">Account Name</label>
                                    <Form.Control name="business_name" defaultValue={currentBankDetail.business_name} onChange={handleInputBankDetails} type="text" />
                                </Form.Group>
                                <Form.Group>
                                    <label className="col-form-label">Account Number</label>
                                    <Form.Control name="account_number" defaultValue={currentBankDetail.account_number} onChange={handleInputBankDetails} type="text" />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="selectDepositFrequency">Frequency of deposit </label>
                                    <select name="settlement_schedule" defaultValue={currentBankDetail.settlement_schedule} onChange={handleInputBankDetails} className="form-control" id="selectDepositFrequency">
                                        {/* <option value="">None</option> */}
                                        {["AUTO", "daily", "weekly"].map((option) => (
                                            <option key={`pay-freq-${option}`} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                        ))}
                                    </select>
                                </Form.Group>
                                <div className="mt-4">
                                    <button onClick={handleUpdateBankDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Insurance</h4>
                            <p className="card-description">If you don't have Goods-In-Transit insurance, kindly visit www.yyy.com and provide your insurance policy upon completion.</p>
                            <form className="forms-sample">
                                <Form.Group>
                                    <label className="col-form-label">Goods-In-Transit Insurance Name</label>
                                    <Form.Control name="git_insurance_name" defaultValue={props.companyDetails.git_insurance_name} onChange={handleInputCompany} type="text" />
                                </Form.Group>
                                <Form.Group>
                                    <label className="col-form-label">Goods-In-Transit Insurance Phone Number</label>
                                    <Form.Control name="git_insurance_phone" defaultValue={props.companyDetails.git_insurance_phone} onChange={handleInputCompany} type="text" />
                                </Form.Group>
                                <div className="mt-4">
                                    <button onClick={handleUpdateCompanyDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Pricing Preferences</h4>
                            <form className="form-sample">
                                <div className="row mt-4">
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <label className="">Do charge a flat rate?</label>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="flat_rate" value={1} onChange={handleInputCompany} id="flatRate1" defaultChecked={props.companyDetails.flat_rate} /> Yes
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="flat_rate" value={0} onChange={handleInputCompany} defaultChecked={!props.companyDetails.flat_rate} id="flatRateRadio2" /> No
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <label className="">Do charge by weight?</label>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="weight_rate" value={1} onChange={handleInputCompany} id="weightRadio1" defaultChecked={props.companyDetails.weight_rate} /> Yes
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="weight_rate" value={0} onChange={handleInputCompany} id="weightRadio2" defaultChecked={!props.companyDetails.weight_rate} /> No
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <label className="">Do charge by distance?</label>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="distance_rate" value={1} onChange={handleInputCompany} id="distanceRadio1" defaultChecked={props.companyDetails.distance_rate} /> Yes
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="distance_rate" value={0} onChange={handleInputCompany} id="distanceRadio2" defaultChecked={!props.companyDetails.distance_rate} /> No
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button onClick={handleUpdateCompanyDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    companyDetails: state.profileReducer.companyDetails,
    managerDetails: state.profileReducer.managerDetails,
    // fetchingProfile: state.profileReducer.fetchingProfile,
});

function mapDispatchToProps(dispatch) {
    return {
        fetchProfile: () => dispatch(fetchProfile()),
        // createFlatRate: (data) => dispatch(createFlatRate(data)),
        updateCompanyDetails: (data) => dispatch(updateCompanyDetails(data)),
        updateManagerDetails: (data) => dispatch(updateManagerDetails(data)),
        // deleteFlatRate: (id) => dispatch(deleteFlatRate(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);