import React, {useEffect} from "react";
import {
  Layout,
  Table,
  Switch,
  Button,
  Icon,
} from "antd";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import PhoneSearchForm from './PhoneSearchForm';
import pagination from './Pagination';

const {Content} = Layout;

const actionsCreators = {
  getClients: actions.getClients,
  getClientDetails: actions.getClientDetails,
};


const mapStateToProps = (state) => {
    return {
        clients: state.clients,
        page: state.clients.page,
        clientsList: state.clients.list.data.map((client) => (
          {
            ...client,
            key: `${client.id}`,
          }
        )),
        clientDetails: state.clients.detailsData,
        statusForDetails: state.clients.statusForDetails
    }
};

const Clients = (props) => {
    const {
      clients,
      getClients,
      clientsList,
      page,
      getClientDetails,
      clientDetails,
      statusForDetails
    } = props;

    useEffect(() => {
        if (clients.status === null) {
          getClients({page, per_page: 2});
        }
    });

    const handleSwitch = (checked) => {
      console.log('this is checked: ', checked);
    }

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
          title: 'Блокирован',
          dataIndex: 'is_blocked',
          key: 'is_blocked',
          render: (blocked) => {
            return <Switch defaultChecked={blocked === true} onChange={handleSwitch} />
          }
      },
    ];

    const displayDetails = (clientId) => {
       if (clientDetails[clientId]) {
        const formattedClientDetails = clientDetails[clientId].map((detail) => {
          if (detail.label === ':payload') {
            return (
              <li key={detail.label}>
                <b>{detail.label}:</b> {detail.value}
              </li>
            );
          }
            return <li key={detail.label}><b>{detail.label}:</b> {detail.value}</li>
        })
        return formattedClientDetails;
       }
    };

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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PhoneSearchForm getByPhone={getClients} />
              <p style={{ marginRight: '1%', fontSize: 14, marginTop: '1%' }}><b>Кол-во:</b> {clients.list.count}</p>
                </div>
                <Table
                  size={"small"}
                  columns={columns}
                  dataSource={clientsList}
                  loading={loading || statusForDetails === 'request'}
                  pagination={pagination(
                    clients.list.count,
                    2,
                    getClients,
                    page
                  )}
                  expandedRowRender = {(record) => (
                      <ul>
                        {displayDetails(record.id)}
                      </ul>
                    )}
                  onExpand={(expanded, record) => {
                    if (expanded) {
                      getClientDetails(record.id);
                      }
                    }
                  }
                />
            </Content>
        </Layout>
    )
};


export default connect(
    mapStateToProps,
    actionsCreators
)(withRouter(Clients));