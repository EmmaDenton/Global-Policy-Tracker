import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
 import './map.css';


 async function getCountryCode(longitude, latitude) {
  const apiKey = 'Mvvrk72TkUzaRcxItiWZ'; // Replace with your actual MapTiler API key
  const url = `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Extracting country code from the response. Adjust the path as needed based on the response structure.
    const countryCode = data.features[0].properties.country_code;
    return countryCode.toUpperCase(); // Ensure the country code is in uppercase as commonly expected
  } catch (error) {
    console.error("Failed to fetch country code:", error);
    return null; // Handle errors appropriately in your app
  }
}

export default function Map({ setSelectedCountry }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(2); 
  
  maptilersdk.config.apiKey = 'Mvvrk72TkUzaRcxItiWZ';

  const handleMapClick = useCallback(async (event) => {
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    const countryCode = await getCountryCode(longitude, latitude);
    
    if (countryCode) {

      setTimeout(() => setSelectedCountry(countryCode), 0);
    }
  }, [setSelectedCountry]);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.DATAVIZ.LIGHT,
      center: [13.39, 52.51],
      zoom: 2
    });

    map.current.on('click', handleMapClick);

    return () => {
      if (map.current) {
        map.current.off('click', handleMapClick);
      }
    };
  }, [zoom, handleMapClick]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}