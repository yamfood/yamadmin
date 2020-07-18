/* eslint-disable */
import React, {useEffect} from "react";

const PolygonMap = (props) => {
    const {regions} = props;

    useEffect(() => {
        if(regions){
            mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vuc2F5IiwiYSI6ImNrNHprbnVicTBiZG8zbW1xMW9hYjQ5dTkifQ.h--Xl_6OXBRSrJuelEKH8g';
            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/kensay/ck52ch6ji00o41ctc1n49mnc8',
                center: [69.2401, 41.2995],
                zoom: 11
            });
            map.on('load', function () {
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
                            'fill-opacity': 0.35
                        }
                    });
                }
            })

        }
    }, [regions]);
    return <div id='map' style={{width: '100%', height: '100%'}}/>
};

export default PolygonMap;
