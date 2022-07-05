import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const GoogleMapApi= () =>{

    const [lat, setLat] = useState(44)
    const [lon, setLon] = useState(85)
    
    let latitude= 44;
    let longitude= 85;

    const submitHandler= (e) =>{
        e.preventDefault();
        console.log(lat, lon)
        latitude=lat;
        longitude=lon;
     
    }
   

    const containerStyle = {
        width: '450px',
        height: '450px',
        marginLeft:'425px',
        marginTop: '20px'
        
      };
      
      const center = {
        // lat: parseFloat(latitude),
        // lng: parseFloat(longitude)

        lat: 84,
        lng: 66
      };

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAQksoRjhPagNErEUKP-DTSp6VR5OnypxY"
      })
    
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

    return(
        <div>
        <h1>Enter Latitude and Longitude </h1>

        <div>
           
            <div className="input-group container  " style={{ marginLeft:'430px' }} >
                <div className="form-outline from " style={{ paddingRight: '10px' }}>
                    <input type="text" onChange={(e) => setLat(e.target.value)}  placeholder="Latitude" className="form-control border border-success rounded" />

                </div>

                <div className="form-outline to " style={{ paddingRight: '10px' }}>
                    <input type="search" onChange={(e) => setLon(e.target.value)}  placeholder="Longitude" className="form-control border border-success rounded" />

                </div>

                <button type="button" onClick={submitHandler} className="btn btn-sm btn-danger">
                    <i className="fa fa-search"></i>

                </button >
            </div>
        </div>


     {   isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>
      </GoogleMap>
  ) : <></>}
        </div>
    )
}

export default GoogleMapApi;
