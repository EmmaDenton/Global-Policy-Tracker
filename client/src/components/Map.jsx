import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const MapChart = ({ countriesWithPolicies, onCountryClick }) => {
    const mapFileUrl = '../../public/ne_10m_admin_0_countries.json';

    return (
        <ComposableMap>
            <Geographies geography={mapFileUrl}>
                {({ geographies }) =>
                    geographies.map(geo => {
                        const isPolicyPresent = countriesWithPolicies.includes(geo.properties.ISO_A2);
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={() => onCountryClick(geo.properties.ISO_A2)}
                                style={{
                                    default: {
                                        fill: isPolicyPresent ? '#FFE464' : '#DDD',
                                        outline: 'none',
                                    },
                                    hover: {
                                        fill: isPolicyPresent ? '#FFDB34' : '#CCC',
                                        outline: 'none',
                                    },
                                    pressed: {
                                        fill: isPolicyPresent ? '#FFD200' : '#BBB',
                                        outline: 'none',
                                    },
                                }}
                            />
                        );
                    })
                }
            </Geographies>
        </ComposableMap>
    );
};

export default MapChart;
