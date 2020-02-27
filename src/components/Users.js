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
// import TableForDetails from './TableForDetails';

const {Content} = Layout;

const actionsCreators = {
    getUsers: actions.getUsers,
    // getClientDetails: actions.getClientDetails,
};


const mapStateToProps = (state) => {
    return {
        users: state.users,
        page: state.users.page,
        userList: state.users.list.data.map((user) => (
          {
            ...user,
            key: `${user.id}`,
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
      page
    } = props;

    useEffect(() => {
        if (users.status === null) {
            getUsers({page, per_page: 2});
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

    // const renderedRow = (user) => {
    //   return <TableForDetails props={user} getDetails={getClientDetails} />
    // }

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
                <Button style={{marginBottom: 20}} onClick={() => getUsers({page: 1, per_page: 2})}><Icon type="reload" /></Button>
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
                    current: page
                  }}
                  // expandedRowRender={renderedRow}
                />
            </Content>
        </Layout>
    )
};


export default connect(
    mapStateToProps,
    actionsCreators
)(withRouter(Users));