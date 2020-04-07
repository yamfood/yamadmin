import React, { useEffect } from 'react';
import {
  Layout,
  Tabs,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import DisabledProducts from './KitchenDisabledProducts';
import KitchenEditForm from './KitchenEditForm';
import DisabledProductModal from './KitchenDisabledModal';

const { Content } = Layout;

const { TabPane } = Tabs;

const KitchenEdit = ({ history }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const kitchen = useSelector((state) => state.kitchens);

  useEffect(() => {
    dispatch(actions.getKitchenDetails(id));
  }, []);

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 'auto',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Изменения Кухни</h1>
        <Tabs type="card" defaultActiveKey="1" animated>
          <TabPane tab="Редактировать" key="1">
            <KitchenEditForm id={id} history={history} />
          </TabPane>
          <TabPane tab="Cтоп лист" key="2">
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}
            >
              <DisabledProductModal id={id} />
            </div>
            <DisabledProducts
              product={kitchen.disabledProducts}
              id={id}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default KitchenEdit;
