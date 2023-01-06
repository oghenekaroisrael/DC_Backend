import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProfile, getCompanyDetails, getIdentificationDetails, getInsuranceDetails, getManagerDetails, getOwnerDetails, getPricing, updateCompanyDetails, updateIdentificationDetails, updateInsuranceDetails, updateManagerDetails, updateOwnerDetails, updatePricing } from '../redux/actions/profile';

import identificationMethods from '../data/identification-methods';
import banks from '../data/banks';
import { endpoints, getHeaders } from '../redux/helpers/api';

export function Profile(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const reduxCompanyDetails = useSelector(state => state.profileReducer.companyDetails);
    const providerDetails = useSelector(state => state.profileReducer.providerDetails);
    const reduxManagerDetails = useSelector(state => state.profileReducer.managerDetails);
    const reduxOwnerDetails = useSelector(state => state.profileReducer.ownerDetails);
    const reduxIdentificationDetails = useSelector(state => state.profileReducer.identification);
    const reduxInsuranceDetails = useSelector(state => state.profileReducer.insuranceDetails);
    const reduxPricing = useSelector(state => state.profileReducer.pricingPreference);
    const key = process.env.REACT_APP_PAYSTACK_KEY;

    const [companyDetails, setCompanyDetails] = useState({});
    const [ownerDetails, setOwnerDetails] = useState({});
    const [managerDetails, setManagerDetails] = useState({});
    const [identificationDetails, setIdentificationDetails] = useState({});
    const [insuranceDetails, setInsuranceDetails] = useState({});
    const [pricing, setPricing] = useState({});
    const [banks, setbanks] = useState([]);
    const [currentBankDetail, setCurrentBankDetail] = useState({});
    const [bankdetails, setbankdetails] = useState({
        business_name: "",
        bank_code: "",
        account_number: "",
        percentage_charge: 0.2,
    });
    

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(getOwnerDetails(providerDetails?.id));
        dispatch(getManagerDetails(providerDetails?.id));
        dispatch(getIdentificationDetails(providerDetails?.id));
        dispatch(getInsuranceDetails(providerDetails?.id));
        dispatch(getPricing(providerDetails?.id));
        dispatch(getCompanyDetails(providerDetails?.id));

        setOwnerDetails(reduxOwnerDetails);
        setManagerDetails(reduxManagerDetails);
        setCompanyDetails(reduxCompanyDetails);
        setIdentificationDetails(reduxIdentificationDetails);
        setInsuranceDetails(reduxInsuranceDetails);
        setPricing(reduxPricing);

        let isDone = false;
        const fetchbanks = async () => {
            fetch('https://api.paystack.co/bank?country=nigeria')
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    console.log("Oops. An Error Occured");
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
                    console.log("Oops. An Error Occured");
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
                    console.log("failed to get sub accounts");
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
                    console.log("Oops. An Error Occured", err);
        });
        }
        fetchbanks();
        return () => {
            isDone = true;
        };
    }, [dispatch]);

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
        setOwnerDetails({
            ...ownerDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleInputIdentification = (e) => {
        setIdentificationDetails({
            ...identificationDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleInputInsurance = (e) => {
        setInsuranceDetails({
            ...insuranceDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleInputPricing = (name, value) => {
        setPricing({
            ...pricing,
            [name]: value
        });
    }

    // useEffect(() => {
    // //   alert(JSON.stringify(pricing));
    // }, [pricing]);
    

    const handleUpdateCompanyDetails = () => {
        if (Object.keys(companyDetails).length) {
            updateCompanyDetails(companyDetails);
            setCompanyDetails({});
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
                    console.log("Oops. An Error Occured");
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
                    console.log("Oops. An Error Occured");
                }
            }).catch(err => {
                console.log("Oops. An Error Occured");
            });
        }).catch(err => {
                    console.log("Oops. An Error Occured");
        });
    }

    const handleUpdateManagerDetails = () => {
        if (Object.keys(managerDetails).length) {
            dispatch(updateManagerDetails({...managerDetails, providerId: providerDetails.id}));
            setManagerDetails({});
        }
    }

    const handleUpdateOwnerDetails = () => {
        if (Object.keys(ownerDetails).length) {
            dispatch(updateOwnerDetails({...ownerDetails, providerId: providerDetails.id}));
            setOwnerDetails({});
        }
    }

    const handleUpdateIdentificationDetails = () => {
        if (Object.keys(identificationDetails).length) {
            dispatch(updateIdentificationDetails({...identificationDetails, providerId: providerDetails.id}));
            setIdentificationDetails({});
        }
    }

    const handleUpdateInsuranceDetails = () => {
        if (Object.keys(insuranceDetails).length) {
            dispatch(updateInsuranceDetails({...insuranceDetails, providerId: providerDetails.id}));
            setInsuranceDetails({});
        }
    }

    const handleUpdatePricing = () => {
        if (Object.keys(pricing).length) {
            dispatch(updatePricing({...pricing, providerId: providerDetails.id}));
            setPricing({});
        }
    }

    const formatDate = (input) => {
        if (!input){
            return;
        }
        let date = new Date(input);
        let output = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        return output;
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
                                            <label className="col-sm-3 col-form-label">Company Name <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" value={user.name} className="bg-dark" readOnly />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phoneNumber" defaultValue={companyDetails.phoneNumber} onChange={handleInputCompany} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Email <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control type="email" value={user.email} className="bg-dark" readOnly />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Website <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control
                                                    name="website" defaultValue={companyDetails.website} onChange={handleInputCompany}
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
                                            <label className="col-sm-3 col-form-label">CAC Number <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="cac_no" defaultValue={companyDetails.cac_no} onChange={handleInputCompany} type="text" placeholder="" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">VAT Number <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="vat_no" defaultValue={companyDetails.vat_no} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">TIN Number <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="tin_no" defaultValue={companyDetails.tin_no} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <p className="card-description"> Address </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Address 1 <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="address_1" defaultValue={companyDetails.address_1} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">State <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="state" defaultValue={companyDetails.state} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Address 2 <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="address_2" defaultValue={companyDetails.address_2} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Postcode <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="post_code" defaultValue={companyDetails.post_code} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">City <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="city" defaultValue={companyDetails.city} onChange={handleInputCompany} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Country <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <select name="country" defaultValue={companyDetails.country} onChange={handleInputCompany} className="form-control">
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
                                            <label className="col-sm-3 col-form-label">First Name <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="firstName" value={ownerDetails?.firstName} onChange={handleInputOwner} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phoneNumber" value={ownerDetails?.phoneNumber} onChange={handleInputOwner} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Last Name <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="lastName" value={ownerDetails?.lastName} onChange={handleInputOwner} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number 2 <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phoneNumber2" value={ownerDetails?.phoneNumber2} onChange={handleInputOwner} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Other Name <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="middleName" value={ownerDetails?.middleName} onChange={handleInputOwner} type="text" placeholder="Olamide" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Whatsapp <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="whatsapp" value={ownerDetails?.whatsapp} onChange={handleInputOwner} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Email <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="email" value={ownerDetails?.email} onChange={handleInputOwner} type="email" placeholder="johndoe@gmail.com" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Address <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="address" value={ownerDetails?.address} onChange={handleInputOwner} type="text" />
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
                                            <label className="col-sm-3 col-form-label">First Name <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="firstName" defaultValue={managerDetails?.firstName} onChange={handleInputManager} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phoneNumber" defaultValue={managerDetails?.phoneNumber} onChange={handleInputManager} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Last Name <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="lastName" defaultValue={managerDetails?.lastName} onChange={handleInputManager} type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Phone Number 2 <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="phoneNumber2" defaultValue={managerDetails?.phoneNumber2} onChange={handleInputManager} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Other Name <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="middleName" defaultValue={managerDetails?.middleName} onChange={handleInputManager} type="text" placeholder="Olamide" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Whatsapp <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="whatsapp" defaultValue={managerDetails?.whatsapp} onChange={handleInputManager} type="tel" placeholder="+234" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Email <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="email" defaultValue={managerDetails?.email} onChange={handleInputManager} type="email" placeholder="john.doe@gmail.com" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">Address <span style={{color: 'red'}}>*</span></label>
                                            <div className="col-sm-9">
                                                <Form.Control name="address" defaultValue={managerDetails?.address} onChange={handleInputManager} type="text" />
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
                                    <label htmlFor="selectIDMethod">Means of Identification </label>
                                    <select key={`id-method-${String(identificationDetails?.type)?.replace(" ","-")}`} name="type" defaultValue={identificationDetails?.type} onChange={handleInputIdentification} className="form-control" id="selectIDMethod">
                                        {/* <option value="">None</option> */}
                                        {identificationMethods.map((option) => (
                                            <option key={`id-method-${option.value}`} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <label>Identification Number <span style={{color: 'red'}}>*</span></label>
                                    <Form.Control name="identificationNumber" defaultValue={identificationDetails?.identificationNumber} onChange={handleInputIdentification} type="text" className="form-control" />
                                </Form.Group>
                                <Form.Group>
                                    <label>Upload an image of your ID <span style={{color: 'red'}}>*</span></label>
                                    <div className="custom-file">
                                        <Form.Control name="idImageUrl" defaultValue={identificationDetails?.id_image_url} onChange={handleInputIdentification} type="file" className="form-control visibility-hidden" id="customFileLang" lang="es" />
                                        <label className="custom-file-label" htmlFor="customFileLang">Upload ID</label>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <label>Issue Date <span style={{color: 'red'}}>*</span></label>
                                    <Form.Control name="issueDate" defaultValue={formatDate(identificationDetails?.issueDate)} onChange={handleInputIdentification} type="date" className="form-control" />
                                </Form.Group>
                                <Form.Group>
                                    <label>Expire Date <span style={{color: 'red'}}>*</span></label>
                                    <Form.Control name="expiryDate" defaultValue={formatDate(identificationDetails?.expiryDate)} onChange={handleInputIdentification} type="date" className="form-control" />
                                </Form.Group>
                                <div className="mt-4">
                                    <button onClick={handleUpdateIdentificationDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
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
                                    <label htmlFor="selectBank">Bank Name <span style={{color: 'red'}}>*</span></label>
                                    <select key={`bank-name-${companyDetails.bank_name}`} name="bank_code" defaultValue={currentBankDetail?.settlement_bank} onChange={handleInputBankDetails} className="form-control" id="selectBank">
                                        {/* <option value="">None</option> */}
                                        {banks.map((option) => (
                                            <option key={option.slug} value={option.code}>{option.name}</option>
                                        ))}
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <label className="col-form-label">Account Name <span style={{color: 'red'}}>*</span></label>
                                    <Form.Control name="business_name" defaultValue={currentBankDetail?.business_name} onChange={handleInputBankDetails} type="text" />
                                </Form.Group>
                                <Form.Group>
                                    <label className="col-form-label">Account Number <span style={{color: 'red'}}>*</span></label>
                                    <Form.Control name="account_number" defaultValue={currentBankDetail?.account_number} onChange={handleInputBankDetails} type="text" />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="selectDepositFrequency">Frequency of deposit <span style={{color: 'red'}}>*</span></label>
                                    <select name="settlement_schedule" defaultValue={currentBankDetail?.settlement_schedule} onChange={handleInputBankDetails} className="form-control" id="selectDepositFrequency">
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
                                    <label className="col-form-label">Goods-In-Transit Insurance Name <span style={{color: 'red'}}>*</span></label>
                                    <Form.Control name="goodsInTransitInsuranceName" defaultValue={insuranceDetails?.goodsInTransitInsuranceName} onChange={handleInputInsurance} type="text" />
                                </Form.Group>
                                <Form.Group>
                                    <label className="col-form-label">Goods-In-Transit Insurance Phone Number <span style={{color: 'red'}}>*</span></label>
                                    <Form.Control name="goodsInTransitPhoneNumber" defaultValue={insuranceDetails?.goodsInTransitPhoneNumber} onChange={handleInputInsurance} type="text" />
                                </Form.Group>
                                <div className="mt-4">
                                    <button onClick={handleUpdateInsuranceDetails} type="button" className="btn btn-primary mr-2">Save Changes</button>
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
                                                        <input type="radio" className="form-check-input" name="chargeFlatRate" value={true} defaultValue={pricing?.chargeFlatRate} onChange={(e)=>handleInputPricing(e.target.name, e.target.value)} id="flatRate1" defaultChecked={pricing?.chargeFlatRate} /> Yes
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="chargeFlatRate" defaultValue={!pricing?.chargeFlatRate} onChange={(e)=>handleInputPricing(e.target.name, e.target.value)} defaultChecked={!pricing?.chargeFlatRate} id="flatRateRadio2" /> No
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
                                                        <input type="radio" className="form-check-input" name="chargeByWeight" defaultValue={pricing?.chargeFlatRate} onChange={(e)=>handleInputPricing(e.target.name, e.target.value)} id="weightRadio1"  defaultChecked={pricing?.chargeByWeight} /> Yes
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="chargeByWeight" defaultValue={!pricing?.chargeFlatRate} onChange={(e)=>handleInputPricing(e.target.name, e.target.value)} id="weightRadio2"  defaultChecked={!pricing?.chargeByWeight} /> No
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
                                                        <input type="radio" className="form-check-input" name="chargeByDistance" defaultValue={pricing?.chargeFlatRate} onChange={(e)=>handleInputPricing(e.target.name, e.target.value)} id="distanceRadio1" defaultChecked={pricing?.chargeByDistance} /> Yes
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="chargeByDistance" defaultValue={!pricing?.chargeFlatRate} onChange={(e)=>handleInputPricing(e.target.name, e.target.value)} id="distanceRadio2" defaultChecked={!pricing?.chargeByDistance} /> No
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button onClick={() => handleUpdatePricing()} type="button" className="btn btn-primary mr-2">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Profile;