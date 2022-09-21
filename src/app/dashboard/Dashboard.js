import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { fetchDeliveries } from '../redux/actions/delivery';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLocations } from '../redux/actions/location';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { delivery } = useSelector(state => state.deliveryReducer);
  const [completed, setcompleted] = useState(0);
  const [processing, setprocessing] = useState(0);
  const [started, setstarted] = useState(0);
  const [revenue, setrevenue] = useState(0);

  useEffect(() => {
    dispatch(fetchDeliveries());
    delivery.map(item=> {
      setrevenue(revenue+parseInt(item.cost));
      if (item.status == "processing"){
          setprocessing(processing+1);
      }else if (item.status == "started"){
        setstarted(started+1);
      }else if (item.status == "completed"){
        setcompleted(completed+1);
    }
    })
  }, []);

  const formatAMPM = (str) => {
        if (!str) return '';
        var date = new Date(str);
        var fullDate = moment(date).format("MM/DD/YYYY");
        return fullDate 
  };

  const data = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ],
    datasets: [{
      label: '# of Deliveries',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: false
    }]
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  }

  const doughnutPieData = {
    datasets: [{
      data: [completed,started,processing],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 206, 86, 0.5)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255,99,132,1)',
        'rgba(255, 206, 86, 1)',
      ],
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Completed',
      'Started',
      'Processing'
    ]
  };

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const toggleProBanner = () => {
    document.querySelector('.proBanner').classList.toggle("hide");
  };

    return (
      <div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card corona-gradient-card">
              <div className="card-body py-0 px-0 px-sm-3">
                <div className="row align-items-center">
                  <div className="col-4 col-sm-3 col-xl-2">
                    <img src={require('../../assets/images/dashboard/Group126@2x.png')} className="gradient-corona-img img-fluid" alt="banner" />
                  </div>
                  <div className="col-5 col-sm-7 col-xl-8 p-0">
                    <h4 className="mb-1 mb-sm-0">Welcome aboard.</h4>
                    <p className="mb-0 font-weight-normal d-none d-sm-block">Finish setting up your profile!</p>
                  </div>
                  <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                    <button className="btn btn-outline-light btn-rounded get-started-btn">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Revenue</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">₦{revenue}</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">0%</p>
                    </div>
                    <h6 className="text-muted font-weight-normal">0% Since you joined</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Bonus</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">₦0.00</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">0%</p>
                    </div>
                    <h6 className="text-muted font-weight-normal"> 0% Since you joined</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Your company is rated </h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">0 / 5</h2>
                      <p className="text-danger ml-2 mb-0 font-weight-medium">- </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">Build your ratings</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-star text-success ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Active Deliveries</h4>
                <p className="card-description">
                  Monitor your delivery
                </p>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Created</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Size</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {delivery.map((item)=> (
                        <tr>
                        <td>{formatAMPM(item.createdAt)}</td>
                        <td>{item.pickupArea}</td>
                        <td>{item.dropoffArea}</td>
                        <td>{item.size}</td>
                        <td>
                          {item.status === "started" && <div className="badge badge-info">{item.status}</div>}
                          {item.status === "completed" && <div className="badge badge-success">{item.status}</div>}
                          {item.status === "processing" && <div className="badge badge-default">{item.status}</div>}
                        </td>
                        <td style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-evenly'
                                                }}>
                                                    <Link className="btn btn-primary btn-lg" to={`/request-details/${item.id}`}>
                                                        VIEW
                                                    </Link>
                                                    {/* <button className="btn btn-primary btn-lg"> VIEW </button> */}
                                                    <button className="btn btn-danger btn-icon-text">
                                                        <i className="mdi mdi-delete"></i>
                                                    </button>
                                                </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-5 text-center text-muted">There are currently no active delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Your activity</h4>
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Performance Breakdown</h4>
                <Doughnut data={doughnutPieData} options={doughnutPieOptions} />
              </div>
            </div>
          </div>
        </div>

        
{/*               
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Visitors by Countries</h4>
                <div className="row">
                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-us"></i>
                            </td>
                            <td>USA</td>
                            <td className="text-right"> 1500 </td>
                            <td className="text-right font-weight-medium"> 56.35% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-de"></i>
                            </td>
                            <td>Germany</td>
                            <td className="text-right"> 800 </td>
                            <td className="text-right font-weight-medium"> 33.25% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-au"></i>
                            </td>
                            <td>Australia</td>
                            <td className="text-right"> 760 </td>
                            <td className="text-right font-weight-medium"> 15.45% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-gb"></i>
                            </td>
                            <td>United Kingdom</td>
                            <td className="text-right"> 450 </td>
                            <td className="text-right font-weight-medium"> 25.00% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-ro"></i>
                            </td>
                            <td>Romania</td>
                            <td className="text-right"> 620 </td>
                            <td className="text-right font-weight-medium"> 10.25% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-br"></i>
                            </td>
                            <td>Brasil</td>
                            <td className="text-right"> 230 </td>
                            <td className="text-right font-weight-medium"> 75.00% </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div id="audience-map" className="vector-map"></div>
                    <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent" //change it to ocean blue: #0077be
                    panOnDrag={true}
                    containerClassName="dashboard-vector-map"
                    focusOn= { {
                      x: 0.5,
                      y: 0.5,
                      scale: 1,
                      animate: true
                    }}
                    series={{
                      regions: [{
                        scale: ['#3d3c3c', '#f2f2f2'],
                        normalizeFunction: 'polynomial',
                        values: mapData
                      }]
                    }}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       */}
      </div>
    );
  }

export default Dashboard;