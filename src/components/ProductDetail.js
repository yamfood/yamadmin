import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {Layout} from "antd";
import {connect} from "react-redux";
import * as actions from "../actions";
import ProductForm from "./ProductForm";

const {Content} = Layout;

const mapStateToProps = (state, ownProps) => {
    const productID = parseInt(ownProps.match.params.id);
    return {
        products: state.products,
        product: state.products.list.filter(p => p.id === productID)[0]
    }
};


const actionsCreators = {
    getProducts: actions.getProducts,
};

const ProductDetail = (props) => {
    const {product = {}, products, getProducts} = props;

    useEffect(() => {
        if (products.status === null) {
            getProducts();
        }
    });

    const loading = products.status === 'request' || products.list === [];

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
            }}
        >
            <h1>Продукт #{product.id}</h1>
            {loading
                ? <h1>Loading...</h1>
                : <ProductForm product={product}/>}
        </Content>
    )
};


export default withRouter(connect(
    mapStateToProps,
    actionsCreators
)(ProductDetail));