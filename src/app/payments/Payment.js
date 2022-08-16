import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchDeliveries } from '../redux/actions/delivery';

export const Payments = () => {
    const dispatch = useDispatch();
    const { delivery } = useSelector(state => state.deliveryReducer);
    useEffect(() => {
        dispatch(fetchDeliveries());
      }, []);
      const formatAMPM = (str) => {
        if (!str) return '';
        var date = new Date(str);
        var fullDate = moment(date).format("MM/DD/YYYY");
        return fullDate 
  };
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
                                        {delivery.map((item)=> (
                                                <tr>
                                                <td>{formatAMPM(item.createdAt)}</td>
                                                <td>{item.senderName}</td>
                                                <td>{item.cost}</td>
                                            </tr>
                                            ))}
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

export default Payments;
