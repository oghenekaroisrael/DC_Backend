import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/auth';

export class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      email: "",
      password: "",
      phoneNumber: "",
      isChecked: false
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleOnChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  handleSignup = () => {
    if (this.state.companyName && this.state.email && this.state.password && this.state.phoneNumber) {
      this.props.registerUser(this.state);
    } else {
      alert("Invalid credentials.")
    }
  }

  handleSubmit = () => {
    if (this.state.isChecked === true) {
      this.handleSignup();
    } else {
      alert ("You must agree with our terms and conditions")
    }
  }



  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input onChange={this.handleInput} name="companyName" value={this.state.companyName} type="text" className="form-control form-control-lg" id="usernameInput" placeholder="Company Name" />
                  </div>
                  <div className="form-group">
                    <input onChange={this.handleInput} name="email" value={this.state.email} type="email" className="form-control form-control-lg" id="emailInput" placeholder="Company Email" />
                  </div>
                  <div className="form-group">
                    <input onChange={this.handleInput} name="password" value={this.state.password} type="password" className="form-control form-control-lg" id="passwordInput" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <input onChange={this.handleInput} name="phoneNumber" value={this.state.phoneNumber} type="text" className="form-control form-control-lg" id="phoneNumberInput" placeholder="Phone Number" />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input onChange={this.handleOnChange} checked={this.state.isChecked} type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms &amp; Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={this.handleSubmit} to="#">SIGN UP</Link>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: (data) => dispatch(registerUser(data))
  }
}

export default connect(null, mapDispatchToProps)(Register);
