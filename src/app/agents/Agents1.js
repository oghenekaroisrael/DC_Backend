import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { fetchFlatRates, deleteFlatRate, createFlatRate, updateFlatRate } from '../redux/actions/profile';
import { formatMoney } from '../redux/helpers/util';
import { fetchAgents } from '../redux/actions/agent';

// This javascript file contains code to show the list of available agents in the system using a table 
// view the manage agents menu page for more information 

export class Agents1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            action: "CREATE",
            start: "",
            dest: "",
            small: "",
            partner_small: "",
            medium: "",
            partner_medium: "",
            large: "",
            partner_large: "",
        };

        // preserve the initial state in a new object
        this.baseState = this.state;
    }
    
    useEffect(() => {
        dispatch(fetchAssets());
    }, []);

    componentDidMount() {
        this.props.fetchFlatRates();
    }

    handleDiscard = () => {
        this.setState(this.baseState);
    }

    handleAddFlatRate = () => {
        const criteria = this.state.start
            && this.state.dest
            && (this.state.small || this.state.medium || this.state.large)

        if (criteria) {
            this.props.createFlatRate(this.state);
            this.handleDiscard();
        }
    }

    allowModification = (id) => {
        const row = this.props.flatRates.find(rate => rate.id === id);
        this.setState({
            ...this.state,
            ...row,
            action: "MODIFY",
        });
        // this
    }

    handleModifyFlatRate = (id) => {
        this.props.updateFlatRate(this.state);
        this.handleDiscard();
    }

    handleDeleteFlatRate = (id) => {
        this.props.deleteFlatRate(id);
        this.handleDiscard();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        let tableRows = [];

        this.props.flatRates.forEach((row, index) => {
            tableRows.push(
                <tr key={`flat-rate-${row.id}`}>
                    <td> {index + 1} </td>
                    <td> {row.start} </td>
                    <td> {row.dest} </td>
                    <td> {formatMoney(row.small, "₦")} {formatMoney(row.partner_small, "/")} </td>
                    <td> {formatMoney(row.medium, "₦")} {formatMoney(row.partner_medium, "/")} </td>
                    <td> {formatMoney(row.large, "₦")} {formatMoney(row.partner_large, "/")} </td>
                    <td>
                        <div className="d-flex justify-content-center">
                            <button onClick={() => this.allowModification(row.id)} className="btn btn-primary mr-2">Modify</button>
                            <button onClick={() => this.handleDeleteFlatRate(row.id)} className="btn btn-danger">Discard</button>
                        </div>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> Agent(s) </h3>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Agent Listing</h4>
                                <p className="card-description">
                                    List of available agent(s)
                                </p>
                                <div className="table-responsive mt-3">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th> # </th>
                                                <th> Full Name </th>
                                                <th> Date of Birth </th>
                                                <th> Address </th>
                                                <th> Phone Number </th>
                                                <th> Status </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableRows}
                                        </tbody>
                                    </table>
                                    {this.props.fetchingFlatRates &&
                                        <Spinner className="d-block mt-5 mx-auto" animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    }
                                    {this.props.fetchFlatRatesError ?
                                        <p className="mt-5 text-center text-muted">{this.props.fetchFlatRatesError}</p>
                                        :
                                        !this.props.fetchingFlatRates && tableRows.length === 0 && (
                                            <p className="mt-5 text-center text-muted">You currently have no flat rates setup </p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    flatRates: state.profileReducer.flatRates,
    fetchFlatRatesError: state.profileReducer.fetchFlatRatesError,
    fetchingFlatRates: state.profileReducer.fetchingFlatRates,
});

function mapDispatchToProps(dispatch) {
    return {
        fetchFlatRates: () => dispatch(fetchFlatRates()),
        createFlatRate: (data) => dispatch(createFlatRate(data)),
        updateFlatRate: (data) => dispatch(updateFlatRate(data)),
        deleteFlatRate: (id) => dispatch(deleteFlatRate(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Agents1);
