import React, { Component } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

export class Progress extends Component {
    data = {
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

    options = {
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

    doughnutPieData = {
        datasets: [{
            data: [500, 20, 100],
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
            'Success',
            'Failed',
            'Undecided'
        ]
    };

    doughnutPieOptions = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title"> Your activity </h4>
                                <Bar data={this.data} options={this.options} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title"> Performance Breakdown </h4>
                                <Doughnut data={this.doughnutPieData} options={this.doughnutPieOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Progress;