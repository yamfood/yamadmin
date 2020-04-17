/* eslint-disable */
import React from "react";
import DeckGL from '@deck.gl/react';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {StaticMap} from 'react-map-gl';
import {mapBoxToken} from "../utils";


const HeatMap = (props) => {
    const {data} = props;
    const mapStyle = 'mapbox://styles/kensay/ck52ch6ji00o41ctc1n49mnc8';
    const colorRange = [
        [160, 200, 220],
        [113, 178, 206],
        [73, 146, 193],
        [39, 115, 180],
        [15, 72, 148]
    ];

    function _renderLayers() {
        return [
            new HexagonLayer({
                id: 'heatmap',
                colorRange,
                data,
                opacity: 0.5,
                getPosition: d => [d.longitude, d.latitude],
                radius: 500
            })
        ];
    }

    const INITIAL_VIEW_STATE = {
        longitude: 69.2401,
        latitude: 41.2995,
        zoom: 11,
    };

    return (
        <div style={{
            position: 'relative',
            height: 500
        }}>
            <DeckGL
                fullscreen={false}
                layers={_renderLayers()}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
            >
                <StaticMap
                    reuseMaps
                    width={400}
                    height={400}
                    mapStyle={mapStyle}
                    mapboxApiAccessToken={mapBoxToken}
                />
            </DeckGL>
        </div>
    )
};

export default HeatMap;