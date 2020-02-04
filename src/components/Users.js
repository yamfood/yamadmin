import React, {useEffect} from "react";
import {Layout, Table} from "antd";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import * as actions from '../actions'
import { Button, Icon } from 'antd';

const {Content} = Layout;

const actionsCreators = {
    getUsers: actions.getUsers,
};


const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

const Users = (props) => {
    const {users, getUsers} = props;

    useEffect(() => {
        if (users.status === null) {
            getUsers();
        }
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'TID',
            dataIndex: 'tid',
            key: 'tid',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Номер',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment'
        },
    ];

    const loading = users.status === 'request';

    return (
        <Layout>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                }}
            >
                <h1 style={{fontSize: 30, textAlign: "center"}}>Пользователи</h1>
                <Button style={{marginBottom: 20}} onClick={getUsers}><Icon type="reload" /></Button>
                <Table size={"small"} columns={columns} dataSource={users.list} loading={loading}/>
            </Content>
        </Layout>
    )
};


export default connect(
    mapStateToProps,
    actionsCreators
)(withRouter(Users));