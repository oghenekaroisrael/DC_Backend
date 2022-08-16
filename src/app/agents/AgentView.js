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
    const [currentPosition, setCurrentPosition] = useState({ lat: parseInt(agents[0]?.latitude) || 6.892322881348826, lng: parseInt(agents[0]?.longitude) || 3.7180006401210317 });
    const [currentZoom, setCurrentZoom] = useState(16);
    const { latitude, longitude, error } = usePosition();

    useEffect(() => {
        dispatch(fetchAgents());
    }, []);

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
    if (latitude && longitude && !error) {
      // Fetch weather data here.
      setCurrentPosition({ lat: latitude, lng: longitude });
      setCurrentZoom(16);
    }
  }, [latitude, longitude, error]);

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{agents[0].lastName+" "+agents[0].firstName}'s Last Known Location</h4>
                            {/* <p>{JSON.stringify(agents[0])}</p> */}
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
