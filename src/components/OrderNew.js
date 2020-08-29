import React, { useEffect, useState } from 'react';
import {
  Button, Col, Descriptions, Form, Input, Layout, List, message, Row, Spin, Typography,
} from 'antd';
import stringSimilarity from 'string-similarity'
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NumberParam, useQueryParam } from 'use-query-params';
import axios from 'axios'
import * as actions from '../actions'

import formWrap from './wrappers/formWrapper';
import MarkerMap from './MarkerMap';

const { Content } = Layout;
const TWO_GIS_TOKEN = 'rupgcl3079';

const typeNames = {
  station: {
    root: 'остановка',
    metro: 'станция метро',
    stop: 'остановка',
    railway: 'жд вокзал',
    river_transport: 'пори',
    trolleybus: 'остановка',
    tram: 'остановка',
    funicular_railway: 'фуникулёр',
    monorail: 'монорельс',
    cable_car: 'канатная дорога',
    light_rail: 'скоростной трамвай',
    premetro: 'метротрам',
    light_metro: 'лёгкое метро',

  },
  street: 'улица',
  building: 'здание',
  parking: 'парковка;',
  attraction: 'достопримечательность',
  crossroad: 'перекрёсток',
  gate: 'проход/проезд',
  road: 'дорога',
  route: 'маршрут',
  adm_div: {
    city: 'город',
    country: 'страна',
    district_area: 'район области',
    district: 'район',
    division: 'округ',
    living_area: 'микрорайон',
    place: 'место',
    region: 'регион',
    settlement: 'населённый пункт',
  },
}

async function searchLocationBy2GIS(q) {
  if (!q) return null;

  const { data } = await axios.get('https://catalog.api.2gis.ru/3.0/items', {
    params: {
      key: TWO_GIS_TOKEN,
      q,
      fields: 'items.point',
      region_id: 208,
    },
  });
  const similarAddresses = data?.result?.items;
  if (similarAddresses?.length > 0) {
    return similarAddresses.map((item) => {
      let address = item.address_name || item.full_name
      let { name } = item;
      let type = '';
      if (item.purpose_name) {
        type = item.purpose_name;
      } else if ((typeNames[item.type] instanceof Object) && item.subtype) {
        type = typeNames[item.type][item.subtype]
      } else if (typeNames[item.type] instanceof Object) {
        type = typeNames[item.type].root
      }
      const isAddressInName = stringSimilarity.compareTwoStrings(
        name.replace('Ташкент', ''),
        address.replace('Ташкент', ''),
      ) > 0.5;

      type = type ? `${type}, ` : ''
      name = name ? `${name} ` : ''
      if (isAddressInName) {
        address = `${type}${address}`
      } else {
        address = `${name}${type}${address}`
      }
      return ({
        id: item.id,
        address,
        longitude: item.point?.lon,
        latitude: item.point?.lat,
      });
    })
  }
  return null
}

function filteredJoin(arr, delim) {
  return arr.filter((m) => m).join(delim || ', ')
}

async function searchAddressBy2GIS(lat, lon) {
  const { data } = await axios.get('https://catalog.api.2gis.ru/3.0/items', {
    params: {
      key: TWO_GIS_TOKEN,
      fields: 'items.address',
      region_id: 208,
      lat,
      lon,
    },
  });

  if (data?.result?.items) {
    const addressObj = data?.result?.items.reduce((acc, item) => {
      const address = (item.address_name || item.full_name).replace('Ташкент', '');
      const { name } = item;
      const isAddressInName = stringSimilarity.compareTwoStrings(
        name.replace('Ташкент', ''),
        address,
      ) > 0.5;
      if (name) {
        return {
          ...acc,
          [item.subtype || item.type]: isAddressInName ? name : `${name}, ${address}`,
        }
      }
      return acc;
    },
      {}
    );
    const {
      region, district, living_area: livingArea, street, place, building,
    } = addressObj;
    return filteredJoin([region, district, livingArea?.replace('ж/м', 'массив'), street || place, building])
  }

  return null;
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
  const loading = !client || !regions || status === 'request';
  const [similarAddresses, setSimilarAddresses] = useState([])
  const [similarAddressesLoading, setSimilarAddressesLoading] = useState(false);
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

  const onShowSimilar = async () => {
    setSimilarAddressesLoading(true);
    const addresses = await searchLocationBy2GIS(form.getFieldValue('address'))
    setSimilarAddressesLoading(false);
    if (addresses && addresses.length > 0) {
      setSimilarAddresses(addresses);
      return addresses
    }
    message.error('По данному адресу ничего не найдено');
  }

  const onGetAddressFromMap = async () => {
    setAddressLoading(true);
    const address = await searchAddressBy2GIS(
      form.getFieldValue('latitude'),
      form.getFieldValue('longitude'),
    )
    if (address) {
      form.setFieldsValue({ address });
    } else {
      message.error('Ненайден адрес по заданной локации');
    }
    setAddressLoading(false);
    await onShowSimilar()
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
              <Descriptions.Item label="Локация" span={2}>
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
              <Descriptions.Item label="Адрес" span={2}>
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
                  loading={similarAddressesLoading && { delay: 500 }}
                  style={{ width: '100%' }}
                  onClick={async () => {
                    const addresses = await onShowSimilar()
                    const { longitude, latitude, address } = addresses[0];
                    form.setFieldsValue({ longitude, latitude, address })
                  }}
                >
                  Найти похожие
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="Похожие адреса" span={2}>
                <List
                  loading={similarAddressesLoading}
                  style={{
                    width: '40vw', height: '30vh', overflowY: 'scroll',
                  }}
                  bordered
                  dataSource={similarAddresses}
                  renderItem={({ id, address, ...location }) => (
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
              <Descriptions.Item label="Предыдущие заказы" span={2}>
                <List
                  loading={loading}
                  style={{
                    width: '40vw', height: '30vh', overflowY: 'scroll',
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
