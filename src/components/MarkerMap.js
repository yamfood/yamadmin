/* eslint-disable */
import React from "react";
import { Map, Placemark } from 'react-yandex-maps';

const MarkerMap = (props) => {
  const {onChange, lat, lng} = props;

  return (
    <Map defaultState={{ center: [lat, lng], zoom: 11 }} width={'100%'} height={300}>
      <Placemark geometry={[lat, lng]}
                 options={{ draggable: true }}
                 onDragEnd={(e) => {
                     const coords = e.originalEvent.target.geometry._coordinates;
                     alert(coords);
                     onChange({lat: coords[0], lng: coords[1]})
                 }}/>
    </Map>
  )
};

export default MarkerMap;
