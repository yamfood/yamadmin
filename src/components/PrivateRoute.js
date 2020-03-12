/* eslint-disable */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  authStatus: state.auth,
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authStatus } = rest;
  return (
    <Route {...rest} render={(props) => {
      return (
        (localStorage.getItem("token") !== null || authStatus.status !== 'failure')
          ? <Component {...props} />
          : <Redirect to='/login/' />
      )
    }} />
  );
};


export default connect(mapStateToProps, null)(PrivateRoute);