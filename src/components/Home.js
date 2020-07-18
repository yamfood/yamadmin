/* eslint-disable */
import React, { useEffect } from "react";
import {Layout} from "antd";
import PolygonMap from "./PolygonMap";
import {contentStyle} from '../assets/style';
import * as actions from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import Title from './shared/Title';
import {getRegions} from "../actions";


const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.setMenuActive(1));
    dispatch(getRegions())
  }, []);
  const regions = useSelector(state => state.regions)
  return (
    <>
      <Title headTitle="Карта покрытия"/>
      <Layout.Content
        style={contentStyle}
      >
        <h1>Главная</h1>
        <PolygonMap regions={regions}/>
      </Layout.Content>
    </>
    )
};

export default Home;