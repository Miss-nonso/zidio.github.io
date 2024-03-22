import React from "react";
import { useState, useEffect } from "react";

import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap
} from "@vis.gl/react-google-maps";

const Dashboard = () => {
  const OPENCAGE_API_KEY = "b589db948e304e7cb43dcdf50472871d";

  let position = { lat: 43.6532, lng: -79.3832 };

  const [userLocation, setUserLocation] = useState(position);
  const [apiComponent, setApiComponent] = useState({});
  const [allUserLocation, setAllUserLocation] = useState([]);

  useEffect(() => {
    navigator.geolocation.watchPosition((showPosition) => {
      let lat = showPosition.coords.latitude;
      let lng = showPosition.coords.longitude;
      setUserLocation({ lat: lat, lng: lng });
    });

    userLocation.lat & userLocation.lng &&
      fetch()
        // `https://api.opencagedata.com/geocode/v1/json?key=${OPENCAGE_API_KEY}&q=${userLocation.lat}+${userLocation.lng}&pretty=1&no_annotations=1`
        .then((response) => response.json())
        .then((result) => setApiComponent(result.results[0].components))
        .catch((err) => {
          // window.alert("Something went wrong. " + err);
        });

    apiComponent.continent &&
      setAllUserLocation([
        ...allUserLocation,
        {
          houseNumber: apiComponent.house_number,
          continent: apiComponent.continent,
          road: apiComponent.road,
          road_type: apiComponent.road_type,
          country: apiComponent.country,
          state: apiComponent.state
        }
      ]);
  }, [userLocation, apiComponent]);

  return (
    // <div className="h-screen w-full">
    //   {/* <APIProvider apiKey="https://maps.googleapis.com/maps/api/js?key=AIzaSyCof3M6gKBxkIQVHnzlm9bApWP1qtklqns"> */}
    //   <div className="w-[100%] h-full">
    //     {" "}
    //     <APIProvider apiKey="AIzaSyCof3M6gKBxkIQVHnzlm9bApWP1qtklqns">
    //       <Map
    //         center={userLocation}
    //         zoom={18}
    //         scrollwheel={true}
    //         fullscreenControl={true}
    //       ></Map>

    //       {/* </APIProvider> */}
    //     </APIProvider>
    //   </div>
    // </div>

    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15155.35973554528!2d7.053823701658492!3d4.825412553570319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7cbc0614a5abe34f!2sOmorofan%20EMT%20Nig%20Ltd!5e0!3m2!1sen!2sng!4v1621235141675!5m2!1sen!2sng"
        width="600"
        height="450"
        // style="border:0;"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Dashboard;
