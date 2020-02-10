import React, {useEffect} from "react";
import {Button, Icon, Layout, Table} from 'antd';

import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import * as actions from "../actions";

const {Content} = Layout;

const actionsCreators = {
    getRiders: actions.getRiders,
};


const mapStateToProps = (state) => {
    return {
        riders: state.riders
    }
};

const RidersList = (props) => {

    const {riders, getRiders} = props;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'TID',
            dataIndex: 'tid',
            key: 'tid'
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
            render: text => `+${text}`
        },
    ];

    useEffect(() => {
        if (riders.status === null) {
            getRiders();
        }
    });

    const loading = riders.status === 'request';

    return (
        <Layout>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                }}
            >
                <h1 style={{fontSize: 30, textAlign: "center"}}>Курьеры</h1>
                <Button style={{marginBottom: 20}} onClick={getRiders}><Icon type="reload"/></Button>
                <Table
                    size={"small"}
                    columns={columns}
                    loading={loading}
                    dataSource={riders.list}/>
            </Content>
        </Layout>
    )
};


export default connect(
    mapStateToProps,
    actionsCreators
)(withRouter(RidersList));
