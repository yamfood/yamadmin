/* eslint-disable */
import React, {useEffect, useState} from "react";

const MarkerMap = (props) => {
  const {onChange, regions, lat, lng} = props;
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const gis = require('2gis-maps');
  useEffect(() => {
    // No map rendered yet, but the location is present
    if (!map && lat && lng) {
      setMap(
        new gis.Map('map', {
          container: 'map',
          center: [lat, lng],
          zoom: 13
        })
      )
    }

    if (map) {
      if (!marker) {
        setMarker(new gis.Marker([lat, lng], {
          draggable: true,
          scale: 1.5,
        }).setLatLng([lat, lng])
          .on('dragend', function (m) {
            onChange(this.getLatLng())
          })
          .addTo(map))
      } else {
        marker.setLatLng([lat, lng])
        map.flyTo([lat, lng])
      }

      if(regions){
        map.on('load', function () {
          if (regions) {
            for (let i in regions) {
              map.addLayer({
                'id': i,
                'type': 'fill',
                'source': {
                  'type': 'geojson',
                  'data': regions[i].polygon
                },
                'layout': {},
                'paint': {
                  'fill-color': '#d97e7e',
                  'fill-opacity': 0.2
                }
              });
            }
          }
        })
      }
    }

  }, [lat, lng, map, regions])

  useEffect(() => {

  }, [regions, lat, lng, ]);
  return <div id='map' style={{width: '100%', height: '100%', ...props.style}}/>
};

export default MarkerMap;
