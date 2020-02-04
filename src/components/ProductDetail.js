import React from "react";
import {withRouter} from "react-router-dom";
import {Layout} from "antd";

const {Content} = Layout;

const ProductDetail = ({match}) => {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
            }}
        >
            <h1>{match.params.id}</h1>
        </Content>
    )
};


export default withRouter(ProductDetail);