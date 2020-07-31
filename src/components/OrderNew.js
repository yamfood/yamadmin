import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Descriptions,
  Input,
  Typography,
  Layout, Row, message, List, Form, Spin,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryParam, NumberParam } from 'use-query-params';
import * as actions from '../actions'
import { httpClient } from '../http-client';

import formWrap from './wrappers/formWrapper';
import MarkerMap from './MarkerMap';
import {
  createOrder,
} from '../actions';

const { Content } = Layout;

function toGisSearchLocation(q, callback, errorCallback) {
  httpClient.get('/api/admin/location', {
    params: {
      q,
    },
  }).then(({ data }) => {
    if (data) {
      callback(data)
    } else {
      if (errorCallback) errorCallback()
      message.error('Не найдена локация по заданному адресу');
    }
  }).catch(() => {
    if (errorCallback) errorCallback()
    message.error('Не найдена локация по заданному адресу')
  });
}


function toGisSearchAddress(lat, lon, callback, errorCallback) {
  httpClient.get('/api/admin/address', {
    params: {
      lat,
      lon,
    },
  }).then(({ data }) => {
    if (data) {
      callback(data)
    } else {
      if (errorCallback) errorCallback()
      message.error('Не найден адрес по заданной локации');
    }
  }).catch(() => {
    if (errorCallback) errorCallback()
    message.error('Не найден адрес по заданной локации')
  });
}


const OrderNew = (props) => {
  const [clientId] = useQueryParam('client_id', NumberParam);
  const dispatch = useDispatch();
  const { form } = props;
  const clients = useSelector((state) => state.clients);
  const { status } = useSelector((state) => state.pendingOrderCreation);
  const client = clients?.detailsData[clientId]
  const regions = useSelector((state) => state.regions)
  const [toGisAddressLoading, setToGisAddressLoading] = useState(false);
  const [toGisLocationLoading, setToGisLocationLoading] = useState(false);
  const loading = !client || !regions || status === 'request';

  useEffect(() => {
    dispatch(actions.setMenuActive(8));
    dispatch(actions.getRegions())
    if (clientId) dispatch(actions.getClientDetails(clientId));
  }, [dispatch, clientId]);
  useEffect(() => {
    if (client && !(form.getFieldValue('latitude') && form.getFieldValue('longitude'))) {
      form.setFieldsValue(
        { latitude: 41.2995, longitude: 69.2401 },
      )
    }
  }, [form, client])

  const onShowAddressInMap = () => {
    setToGisLocationLoading(true);
    toGisSearchLocation(form.getFieldValue('address'),
      (v) => {
        setToGisLocationLoading(false);
        form.setFieldsValue({
          latitude: v.lat,
          longitude: v.lon,
        })
      }, () => setToGisLocationLoading(false))
  }

  const onGetAddressFromMap = () => {
    setToGisAddressLoading(true);
    toGisSearchAddress(form.getFieldValue('latitude'), form.getFieldValue('longitude'),
      (v) => {
        setToGisAddressLoading(false);
        form.setFieldsValue(v)
      }, () => setToGisAddressLoading(false))
  }

  return (
    <Layout>
      <Spin style={{ height: '100%' }} spinning={loading}>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            height: '95vh',
            overflow: 'auto',
          }}
        >
          <div>
            <Descriptions
              title="Новый заказ"
              size="small"
              column={4}
              layout="vertical"
              bordered
            >
              <Descriptions.Item label="Локация" span={3}>
                <MarkerMap
                  regions={regions}
                  style={{ minWidth: 200, width: '100%', height: '50vh' }}
                  lat={form.getFieldValue('latitude')}
                  lng={form.getFieldValue('longitude')}
                  onChange={({ lat, lng }) => {
                    form.setFieldsValue({ latitude: lat, longitude: lng });
                  }}
                />
                {form.getFieldDecorator(('latitude'), {
                  rules: [{
                    required: true,
                    message: 'Это обязательное поле',
                  }],
                })(
                  <Input hidden />,
                )}
                {form.getFieldDecorator(('longitude'), {
                  rules: [{
                    required: true,
                    message: 'Это обязательное поле',
                  }],
                })(
                  <Input hidden />,
                )}
                <Row type="flex" justify="center">
                  <Col>
                    <Button
                      loading={toGisAddressLoading && { delay: 500 }}
                      style={{ marginTop: 4 }}
                      onClick={onGetAddressFromMap}
                    >
                      Определить адрес
                    </Button>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Адрес" span={1}>
                <Form.Item style={{ width: '100%' }}>
                  {form.getFieldDecorator(('address'), {
                    rules: [{
                      required: true,
                      message: 'Это обязательное поле',
                    }],
                  })(
                    <Input.TextArea style={{ width: '100%', height: '33vh' }} />,
                  )}
                </Form.Item>
                <Button
                  loading={toGisLocationLoading && { delay: 500 }}
                  style={{ width: '100%' }}
                  onClick={onShowAddressInMap}
                >
                  Показать на
                  карте
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="Предыдущие заказы" span={4}>
                <List
                  style={{
                    width: '100%', maxHeight: '20vh', height: '100%', overflowY: 'scroll',
                  }}
                  bordered
                  dataSource={client?.last_orders}
                  renderItem={({
                    id, location, address,
                  }) => (
                    <List.Item
                      key={id}
                      className="hoverable"
                      onClick={() => form.setFieldsValue({ ...location, address })}
                    >
                      {address
                      && (
                        <Typography.Text>
                          {address}
                        </Typography.Text>
                      )}
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Клиент" span={2}>
                {client?.name}
                {form.getFieldDecorator('client_id', { initialValue: clientId })(<Input
                  type="hidden"
                />)}
              </Descriptions.Item>
              <Descriptions.Item label="Телефон" span={2}>{client?.phone}</Descriptions.Item>
              <Descriptions.Item label="Заметки" span={4}>
                {form.getFieldDecorator(('notes'), {})(
                  (<Input.TextArea style={{ width: '100%', height: 50 }} />),
                )}
              </Descriptions.Item>
            </Descriptions>
            <br />
            <div
              className="order-details-buttons"
              style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }}
            >
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
              >
                Создать
              </Button>
            </div>
          </div>
        </Content>
      </Spin>
    </Layout>
  )
};


export default withRouter(formWrap(OrderNew,
  (values, dispatch) => {
    dispatch(createOrder(values));
  }));
