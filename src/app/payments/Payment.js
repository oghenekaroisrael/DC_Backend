import React, { Component } from 'react';

export class Payments extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Payment History</h4>
                                <p className="card-description">
                                    List Of Successful Payments
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th> Date </th>
                                                <th> Customer Name </th>
                                                <th> Amount </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                    <p className="mt-5 text-center text-muted">There are currently no active payments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payments