import React, {useEffect} from "react";
import {Button, Icon, Layout, Table} from 'antd';

import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import * as actions from "../actions";

const {Content} = Layout;

const actionsCreators = {
    getKitchens: actions.getKitchens,
};


const mapStateToProps = (state) => {
    return {
        kitchens: state.kitchens
    }
};

const KitchensList = (props) => {

    const {kitchens, getKitchens} = props;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name'
        },
    ];

    useEffect(() => {
        if (kitchens.status === null) {
            getKitchens();
        }
    });

    const loading = kitchens.status === 'request';

    return (
        <Layout>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                }}
            >
                <h1 style={{fontSize: 30, textAlign: "center"}}>Кухни</h1>
                <Button style={{marginBottom: 20}} onClick={getKitchens}><Icon type="reload"/></Button>
                <Table
                    size={"small"}
                    columns={columns}
                    loading={loading}
                    dataSource={kitchens.list}/>
            </Content>
        </Layout>
    )
};


export default connect(
    mapStateToProps,
    actionsCreators
)(withRouter(KitchensList));
