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
import axios from 'axios'
import * as actions from '../actions'

import formWrap from './wrappers/formWrapper';
import MarkerMap from './MarkerMap';

const { Content } = Layout;

// function searchLocationBy2GIS(q, callback, errorCallback) {
//   axios.get('https://catalog.api.2gis.ru/3.0/items', {
//     params: {
//       key: 'rupgcl3079',
//       q,
//       fields: 'items.point',
//       region_id: 208,
//     },
//   }).then(({ data }) => {
//     if (data?.result?.items[0]) {
//       callback({
//         longitude: data.result.items[0].point?.lon,
//         latitude: data.result.items[0].point?.lat,
//       })
//     } else {
//       if (errorCallback) errorCallback()
//       message.error('Ненайдена локация по заданному адресу');
//     }
//   });
// }

function searchLocationByYandex(q, callback, errorCallback) {
  axios.get('https://geocode-maps.yandex.ru/1.x', {
    params: {
      apikey: '8dbe3f68-3173-479f-ad7c-c05cad82197e',
      format: 'json',
      geocode: `Ташкент, ${q}`,
    },
  }).then(({ data }) => {
    const result = data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos;
    if (result) {
      callback({
        longitude: result.split(' ')[0],
        latitude: result.split(' ')[1],
      })
    } else {
      if (errorCallback) errorCallback()
      message.error('Не найдена локация по заданному адресу');
    }
  }).catch(() => {
    if (errorCallback) errorCallback()
    message.error('Не найдена локация по заданному адресу')
  });
}

const suffix = {
  district: 'район',
}

const prefix = {
  street: 'улица',
}

function filteredJoin(arr, delim) {
  return arr.filter((m) => m).join(delim || ', ')
}

// function searchAddressBy2GIS(lat, lon, callback, errorCallback) {
//   axios.get('https://catalog.api.2gis.ru/3.0/items', {
//     params: {
//       key: 'rupgcl3079',
//       fields: 'items.address',
//       region_id: 208,
//       lat,
//       lon,
//     },
//   }).then(({ data }) => {
//     if (data?.result?.items) {
//       const addressObj = data?.result?.items.reduce((acc, v) => {
//         const name = v.building_name || v.address_name || v.name;
//         if (name) {
//           return {
//             ...acc,
//             [v.subtype || v.type]: filteredJoin(
//               [prefix[v.subtype || v.type],
//                 name,
//                 suffix[v.subtype || v.type]], ' ',
//             ),
//           }
//         }
//         return acc;
//       },
//         {}
//       );
//       const {
//         region, district, living_area: livingArea, street, place, building,
//       } = addressObj;
//       const address = filteredJoin([region, district, livingArea?.replace('ж/м', 'массив'), street || place, building]);
//       callback({ address })
//     } else {
//       if (errorCallback) errorCallback()
//       message.error('Ненайдена локация по заданному адресу');
//     }
//   });
// }


function searchAddressByYandex(lat, lon, callback, errorCallback) {
  axios.get('https://geocode-maps.yandex.ru/1.x', {
    params: {
      apikey: '8dbe3f68-3173-479f-ad7c-c05cad82197e',
      format: 'json',
      geocode: `${lon},${lat}`,
    },
  }).then(({ data }) => {
    console.log(data);
    const result = data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted;
    if (result) {
      callback({ address: result })
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
  const [addressLoading, setAddressLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
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
    setLocationLoading(true);
    searchLocationByYandex(form.getFieldValue('address'),
      (v) => {
        setLocationLoading(false);
        form.setFieldsValue(v)
      }, () => setLocationLoading(false))
  }

  const onGetAddressFromMap = () => {
    setAddressLoading(true);
    searchAddressByYandex(form.getFieldValue('latitude'), form.getFieldValue('longitude'),
      (v) => {
        setAddressLoading(false);
        form.setFieldsValue(v)
      }, () => setAddressLoading(false))
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
                      loading={addressLoading && { delay: 500 }}
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
                  loading={locationLoading && { delay: 500 }}
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
    dispatch(actions.createOrder(values));
  }));
