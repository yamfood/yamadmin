import React, {useEffect} from "react";
import {Layout, Table} from "antd";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import {
  Button,
  Icon,
} from 'antd';
import ClientForm from './ClientsForm';

const {Content} = Layout;

const actionsCreators = {
    getUsers: actions.getUsers,
    getClientDetails: actions.getClientDetails,
};


const mapStateToProps = (state) => {
    return {
        users: state.users,
        page: state.users.page,
        userList: state.users.list.data.map((user, i) => (
          {
            ...user,
            key: `${i}`,
            // description: 'hello',
          }
        ))
    }
};

const Users = (props) => {
    const {
      users,
      getUsers,
      userList,
      // getClientDetails
    } = props;

    useEffect(() => {
        if (users.status === null) {
            getUsers({page: 1, per_page: 2});
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

    const handlePage = (page) => {
      getUsers({page, per_page: 2});
    }

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
                <h1 style={{fontSize: 30, textAlign: "center"}}>Клиенты</h1>
                <Button style={{marginBottom: 20}} onClick={getUsers}><Icon type="reload" /></Button>
                <ClientForm getUsers={getUsers} />
                <Table
                  size={"small"}
                  columns={columns}
                  dataSource={userList}
                  loading={loading}
                  pagination={{
                    total: users.list.count,
                    pageSize: 2,
                    onChange: handlePage,
                  }}
                  // expandedRowRender={(record) => {
                  //   console.log('record id: ', record.id);
                  //   getClientDetails(record.id);
                  // }}
                />
            </Content>
        </Layout>
    )
};


export default connect(
    mapStateToProps,
    actionsCreators
)(withRouter(Users));