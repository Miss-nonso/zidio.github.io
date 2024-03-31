import React from "react";

import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import purpleLocationIcon22 from "../../assets/images/purpleLocationIcon22.png";
import { useState, useEffect } from "react";
const openCageApi = import.meta.env.VITE_OPENCAGE_API_KEY;
const googleMapApi = import.meta.env.VITE_GOOGLEMAPS_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "100%"
};

const App = () => {
  const [userLocation, setUserLocation] = useState({});
  const [apiComponent, setApiComponent] = useState({});
  const [allUserLocation, setAllUserLocation] = useState([]);
  const [apiStatus, setApiStatus] = useState(200);
  const [locationToDisp, setLocationToDisp] = useState([]);

  useEffect(() => {
    navigator.geolocation.watchPosition((showPosition) => {
      let lat = showPosition.coords.latitude;
      let lng = showPosition.coords.longitude;
      setUserLocation({ lat: lat, lng: lng });
    });

    userLocation.lat & userLocation.lng &&
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?key=${openCageApi}&q=${userLocation.lat}+${userLocation.lng}&pretty=1&no_annotations=1`
      )
        .then((response) => response.json())
        .then((result) => {
          setApiComponent(result.results[0].components);
          setApiStatus(result.status.code);
        })
        .catch((err) => {
          console.log("Something went wrong. " + err.message);
        });

    !allUserLocation & apiComponent.road
      ? setAllUserLocation([
          ...allUserLocation,
          {
            houseNumber: apiComponent.house_number
              ? apiComponent.house_number
              : "",
            continent: apiComponent.continent,
            road: apiComponent.road ? apiComponent.road : "",
            road_type: apiComponent.road_type ? apiComponent.road_type : "",
            country: apiComponent.country,
            state: apiComponent.state
          }
        ])
      : allUserLocation[allUserLocation.length - 1] &&
        allUserLocation[allUserLocation.length - 1].road === apiComponent.road
      ? "no data"
      : setAllUserLocation([
          ...allUserLocation,
          {
            houseNumber: apiComponent.house_number
              ? apiComponent.house_number
              : "",
            continent: apiComponent.continent,
            road: apiComponent.road ? apiComponent.road : "",
            road_type: apiComponent.road_type ? apiComponent.road_type : "",
            country: apiComponent.country,
            state: apiComponent.state
          }
        ]);
  }, [userLocation, apiComponent]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCof3M6gKBxkIQVHnzlm9bApWP1qtklqns"
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="">
      <h1 className="text-4xl pl-12 p-4  font-bold text-darkPink py-4  flex items-center justify-start ">
        <img
          src={purpleLocationIcon22}
          alt="Zidio location tracker logo"
          className="h-[3rem] rotate"
        />
        <p className="text-4xl font-bold text-darkPink"> ZIDIO</p>
      </h1>

      <div className="md:flex md:flex-row flex flex-col gap-2 p-4 pt-0 md:gap-1 md:pb-12 md:pr-0">
        {" "}
        <div className="md:w-[70vw] md:h-[83vh] h-[80dvh] w-full">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            className=""
            zoom={20}
            center={userLocation}
            full
            scrollWheel={true}
          >
            <AdvancedMarker
              className="bg-red-900 h-[5rem] w-[5rem]"
              position={userLocation}
            />
          </GoogleMap>
        </div>
        <div className="md:w-[30vw] md:h-[83vh] p-6 bg-bodyPurple overflow-y-scroll w-full ">
          <h2 className="text-center font-bold text-2xl pb-6">All locations</h2>
          <ul className="grid gap-1">
            {allUserLocation.map(
              (location, index) =>
                location.road && (
                  <li
                    key={index}
                    className="grid gap-[0.1rem] border-b-2 py-2 border-borderPurple"
                  >
                    <small>{location.road_type}</small>
                    <span>
                      {" "}
                      <span className="pr-2">{location.houseNumber}</span>
                      <span>{location.road},</span>
                    </span>
                    <div>
                      {location.state}, {location.country}, {location.continent}
                      .
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
