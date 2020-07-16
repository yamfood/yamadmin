/* eslint-disable */
import React, {useEffect, useState} from "react";

const MarkerMap = (props) => {
  const {onChange, regions, lat, lng} = props;
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    // No map rendered yet, but the location is present
    if (!map && lat && lng) {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vuc2F5IiwiYSI6ImNrNHprbnVicTBiZG8zbW1xMW9hYjQ5dTkifQ.h--Xl_6OXBRSrJuelEKH8g'
      setMap(
        new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/kensay/ck52ch6ji00o41ctc1n49mnc8',
          center: [lng, lat],
          zoom: 13
        })
      )
    }

    if (map) {
      if (!marker) {
        setMarker(new mapboxgl.Marker({
          draggable: true,
          scale: 1.5,
        })
          .setLngLat([lng, lat])
          .on('dragend', function (m) {
            onChange(this.getLngLat())
          })
          .addTo(map))
      } else {
        marker.setLngLat([lng, lat])
        map.setCenter([lng, lat])
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
    if (!location) {
      console.error("Something wrong with regions data")
    }
  }, [regions, lat, lng, ]);
  return <div id='map' style={{width: '100%', height: '100%', ...props.style}}/>
};

export default MarkerMap;
