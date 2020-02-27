import React, {useEffect} from "react";
import {Layout, Table} from "antd";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import {
  Button,
  Icon,
} from 'antd';
import ClientForm from './ClientForm';

const {Content} = Layout;

const actionsCreators = {
  getClients: actions.getClients,
};


const mapStateToProps = (state) => {
    return {
        clients: state.clients,
        page: state.clients.page,
        userList: state.clients.list.data.map((client) => (
          {
            ...client,
            key: `${client.id}`,
          }
        ))
    }
};

const Clients = (props) => {
    const {
      clients,
      getClients,
      userList,
      page
    } = props;

    useEffect(() => {
        if (clients.status === null) {
          getClients({page, per_page: 2});
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
      getClients({page, per_page: 2});
    }

    const loading = clients.status === 'request';
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
                <Button style={{marginBottom: 20}} onClick={() => getClients({page: 1, per_page: 2})}><Icon type="reload" /></Button>
                <ClientForm getClients={getClients} />
                <Table
                  size={"small"}
                  columns={columns}
                  dataSource={userList}
                  loading={loading}
                  pagination={{
                    total: clients.list.count,
                    pageSize: 2,
                    onChange: handlePage,
                    current: page
                  }}
                />
            </Content>
        </Layout>
    )
};


export default connect(
    mapStateToProps,
    actionsCreators
)(withRouter(Clients));