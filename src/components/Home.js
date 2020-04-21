/* eslint-disable */
import React from "react";
import {Layout} from "antd";
import HeatMap from "./HeatMap";
import { contentStyle } from '../assets/style';


const Home = () => {

    const data = 'https://s3-eu-west-1.amazonaws.com/bucketeer-a6f8aeba-d25c-4758-8db5-b90b9d74d72d/test/9d9d582a-264d-4206-b809-eb5ca6837ef4.json';

    return (
        <Layout.Content
            style={contentStyle}
        >
            <h1>Главная</h1>
            <HeatMap data={data}/>
        </Layout.Content>
    )
};

export default Home;