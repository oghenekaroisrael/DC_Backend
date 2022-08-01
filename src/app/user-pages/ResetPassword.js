import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/auth';



export class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = () => {
    // if (this.state.email && this.state.password) {
    //   this.props.logUserIn(this.state);
    // } else {
    //   alert("Invalid credentials.")
    // }
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>Oops! Let's fix this</h4>
                <h6 className="font-weight-light">Input your Email address.</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control onChange={this.handleInput} name="email" value={this.state.email} type="email" placeholder="Company Email" size="lg" className="h-auto" />
                  </Form.Group>
                  <div className="mt-3">
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onChange={this.handleSubmit}  to="#">SUBMIT</Link>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Go back to  <Link to="/login" className="text-primary">Login</Link>
                  </div>
                </Form>
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
  
  export default connect(null, mapDispatchToProps)(ResetPassword);


