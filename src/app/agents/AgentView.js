import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { usePosition } from "use-position";
import { useParams } from 'react-router-dom';
import { fetchAgents, deleteAgent } from '../redux/actions/agent';



export function AgentView() {
    const dispatch = useDispatch();
    const params = useParams();
    const { agents } = useSelector(state => state.agentReducer);
    const [agent, setAgent] = useState({});
    const [currentPosition, setCurrentPosition] = useState({});
    const [currentZoom, setCurrentZoom] = useState(16);
    const { latitude, longitude, error } = usePosition();

    // useEffect(() => {
    //     dispatch(fetchAgents());
    // }, []);

    const handleDeleteAgent = (id) => {
        dispatch(deleteAgent(id));
    }
    
    const defaultMapConfig = {
        gestureHandling: "greedy",
        options: {
          fullscreenControl: false
        },
        mapContainerStyle: {
          height: "300px",
          width: "100%"
        }
      };

      

  useEffect(() => {
    dispatch(fetchAgents());
    // console.log(params.id);
    // console.log(agents);
    const cagent = agents?.filter(agent => {
        return agent.id == params.id;
    });
    setAgent(cagent[0]);
    if (latitude && longitude && !error) {
      // Fetch weather data here.
    //   setCurrentPosition({ lat: latitude, lng: longitude });
    setCurrentPosition({ lat: parseInt(agent?.latitude) || 6.892322881348826, lng: parseInt(agent?.longitude) || 3.7180006401210317 });
      setCurrentZoom(16);
    }
  }, [latitude, longitude, error]);

//   setAgent();
    console.log("view me", agent);
    return (
        <div>
            <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Agent Details</h4>
                            <div className='row mb-3'>
                                    <div className="col-lg-6">
                                        <div class="text-primary">Last Name</div>
                                        <div>{agent?.lastName}</div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div class="text-primary">First Name</div>
                                        <div>{agent?.firstName}</div>
                                    </div>
                            </div>
                            <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <div class="text-primary">Phone Number</div>
                                        <div>{agent?.phoneNumber}</div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div class="text-primary">State</div>
                                        <div>{agent?.state}</div>
                                    </div>
                            </div>
                            <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <div class="text-primary">Address</div>
                                        <div>{agent?.address}</div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div class="text-primary">Default Agent</div>
                                        {agent?.defaultAgent === true &&
                                            <div className="badge badge-success">
                                                Default Agent
                                            </div>
                                        }
                                        {agent?.defaultAgent === false &&
                                            <div className="badge badge-danger">
                                                Not Default Agent
                                            </div>
                                        }
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
                            <h4 className="card-title">{agent?.lastName+" "+agent?.firstName}'s Last Known Location</h4>
                            {/* <p>{JSON.stringify(agent?)}</p> */}
                            {/* <p className="card-description">Lists of Available Agents</p> */}
                            <LoadScript
                                googleMapsApiKey={"AIzaSyDYp1te-bQEhWE9P9yehRE3biB7LpSEh4U"}
                                loadingElement={<div />}
                                containerElement={<div />}
                                mapElement={<div />}
                            >
                                <GoogleMap
                                {...defaultMapConfig}
                                defaultCenter={{ lat: 0, lng: 0 }}
                                center={currentPosition}
                                zoom={currentZoom}
                                >
                                     <Marker
                                        icon={"https://img.icons8.com/external-bearicons-flat-bearicons/45/external-People-location-bearicons-flat-bearicons.png"}
                                        position={currentPosition}
                                        animation={1}
                                    />
                                    </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AgentView;
