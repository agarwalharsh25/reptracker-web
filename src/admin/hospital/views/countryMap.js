import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import React, { Component } from 'react';
  
  const INDIA_TOPO_JSON = require('../../../utils/india.json');
  
  const PROJECTION_CONFIG = {
      scale: 1500,
      center: [82.34, 22.5]
    };
  
  export default function CountryMap() {
    return (
      <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          height="1000"
          data-tip=""
      >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                    style={{
                        default: {
                            outline: 'none'
                        },
                        hover: {
                            fill: '#ccc',
                            transition: 'all 250ms',
                            outline: 'none'
                        },
                        pressed: {
                            outline: 'none'
                        }
                    }}
                  />
                );
              })
            }
          </Geographies>
      </ComposableMap>
    )
  }