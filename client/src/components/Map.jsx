import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
 import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = 'dMbk65SQVJyXsUyHf7SS';

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.DATAVIZ.LIGHT,
      center: [13.39, 52.51],
      zoom: 2
    });

    // map.current.on('load', function() {
    //   map.addSource('statesData', {
    //     type: 'vector',
    //     url: `https://api.maptiler.com/tiles/countries/tiles.json`
    //   });
    // });

    // map.addLayer(
    //   {
    //     'id': 'countries',
    //     'source': 'statesData',
    //     'source-layer': 'administrative',
    //     'type': 'fill',
    //     'paint': {
    //         'fill-color': '#6B7C93',
    //         'fill-opacity': 1,
    //         'fill-outline-color': '#000'
    //     }
    //   },
    //   firstSymbolId
    // );

    // map.addLayer(
    //   {
    //     'id': 'countries',
    //     'source': 'statesData',
    //     'source-layer': 'administrative',
    //     'type': 'fill',
    //     'filter': ['==', 'level', 0],
    //     'paint': {
    //         'fill-color': '#6B7C93',
    //         'fill-opacity': 1,
    //         'fill-outline-color': '#000'
    //     }
    //   },
    //   firstSymbolId
    // );

  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}