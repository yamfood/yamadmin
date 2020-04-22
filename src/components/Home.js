/* eslint-disable */
import React, { useEffect } from "react";
import {Layout} from "antd";
import HeatMap from "./HeatMap";
import { contentStyle } from '../assets/style';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import Title from './shared/Title';


const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.setMenuActive(1));
  }, []);
    const data = 'https://s3-eu-west-1.amazonaws.com/bucketeer-a6f8aeba-d25c-4758-8db5-b90b9d74d72d/test/9d9d582a-264d-4206-b809-eb5ca6837ef4.json';

  return (
    <>
      <Title headTitle="Главная" />
        <Layout.Content
            style={contentStyle}
        >
            <h1>Главная</h1>
            <HeatMap data={data}/>
      </Layout.Content>
      </>
    )
};

export default Home;